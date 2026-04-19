<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\User;
use App\Models\Session;
use App\Models\Question;
use App\Models\Conversation;
use Illuminate\Support\Carbon;
use App\Models\ConversationType;
use App\Models\ConversationDetail;
use Illuminate\Support\Facades\DB;
use App\Events\AgentWorkStatusEvent;
use Illuminate\Support\Facades\Auth;
use App\Models\ConversationAssociate;
use App\Models\TempQueueConversation;
use App\Http\Resources\QuestionResource;
use App\Events\NewConversationAttachEvent;
use App\Events\TempQueueConversationEvent;

/**
 * ConversationService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ConversationService
{


    ## Service properties
    private ChatbotService $chatbot_service;
    private NotifyService $notify_service;
    public function __construct()
    {
        $this->chatbot_service = new ChatbotService();
        $this->notify_service = new NotifyService();
    }

    /**
     * get_active_conversation_list_by_user method returns list of Conversation List 
     * @return collection
     */
    public function get_active_conversation_list_by_user()
    {
        $role = Auth::user()->roles->pluck('name')->first();

        if ($role == "admin") {
            return Conversation::with('leads')->whereIn('status', [2, 3])->orderBy('id', 'DESC')->get();
        }
        return Conversation::with('leads')->whereHas('associates', function ($query) {
            $query->where('user_id', '=', Auth::id());
        })->whereIn('status', [2, 3])->orderBy('id', 'DESC')->get();
    }

    /**
     * get_all_conversation_by_id method returns list of Conversations
     * @return collection
     */
    public function get_all_conversation_by_id($id, $conversation_status)
    {
        // $conversations = ConversationDetail::where('conversation_id', $id)->where('conversation_type_id', 3)->orderBy('id', 'ASC')->get();
        $conversations = ConversationDetail::where('conversation_id', $id)
            ->where('conversation_type_id', 3)
            ->where('created_at', '>=', Carbon::now()->subDays(3)) // Filter for the last 3 days
            ->orderBy('id', 'ASC')
            ->get();

        //conversation  starting update from new one
        $conversation = null;
        if (($conversation_status != null)) {
            $conversation = Conversation::where('id', $id)->first();
        }
        if ($conversation) {
            if ($conversation->status != 4) {
                $conversation->status =  $conversation_status;
                $conversation->save();
            }
            //agent status event call
            $this->get_conversation_info_by_id($id);
        }

        if ($conversations) {
            return  $conversations;
        }

        return [];
    }

    /**
     * get_all_conversation_by_id method returns list of Conversations
     * @return collection
     */
    public function agent_reply_live_chat_question($request)
    {
        $broadcast_channel = $request->token;
        $conversation_id = $request->conversation_id;
        $message = $request->message;

        $conversation = Conversation::where('id', $conversation_id)->first();
        $conversation_type = ConversationType::where('name', 'Live-Chat')->first();

        $chat_agent_conversation = ConversationDetail::create([
            'conversation_id' =>  $conversation_id,
            'question_id' => NULL,
            'conversation_type_id' => ($conversation_type != null) ?  $conversation_type->id : 1,
            'message_body' => $message,
            'lead_id' => $conversation->lead_id,
            'user_id' => NULL,
            'receive_status' => '2',
            'is_read' => 1,
        ]);
    }

    /**
     * get_conversation_info method returns list of Conversation Information 
     * @return collection
     */
    public function get_conversation_info()
    {
        $conversation_info = array(
            'queue' => 0,
            'new' => 0,
            'progress' => 0
        );
        $role = Auth::user()->roles->pluck('name')->first();
        $conversation_info['queue'] = TempQueueConversation::get()->count();

        if ($role == "admin") {
            $conversation_info['new'] = conversation::where('status', 2)->get()->count();
            $conversation_info['progress'] = conversation::where('status', 3)->get()->count();
            return  collect($conversation_info);
        }

        $conversation_info['new'] = conversation::where('status', 2)->whereHas('associates', function ($query) {
            $query->where('user_id', '=', Auth::id());
        })->get()->count();
        $conversation_info['progress'] = conversation::where('status', 3)->whereHas('associates', function ($query) {
            $query->where('user_id', '=', Auth::id());
        })->get()->count();

        return  collect($conversation_info);
    }

    /**
     * temp_queue_count method returns list of Conversation Information 
     * @return collection
     */
    public function get_total_temp_queue()
    {
        $count = TempQueueConversation::get()->count();

        if ($count) {
            return $count;
        }

        return  0;
    }

    /**
     * get_conversation_info_by_id method returns list of Conversation Information 
     * @return collection
     */
    public function get_conversation_info_by_id($conversation_id)
    {
        $conversation_info = array(
            'new' => 0,
            'progress' => 0,
        );

        $conversation_associate = ConversationAssociate::where('conversation_id', $conversation_id)->first();
        if ($conversation_associate) {

            $conversation_info['new'] = conversation::where('status', 2)->whereHas('associates', function ($query) use ($conversation_associate) {
                $query->where('user_id', '=', $conversation_associate->user_id);
            })->get()->count();
            $conversation_info['progress'] = conversation::where('status', 3)->whereHas('associates', function ($query) use ($conversation_associate) {
                $query->where('user_id', '=', $conversation_associate->user_id);
            })->get()->count();

            AgentWorkStatusEvent::dispatch($conversation_info, $conversation_associate->user_id);
        }
    }

    public function all_conversation_by_phone($request)
    {

        $phone  = $request->phone;
        $token  = $request->token;
        $conversation = Conversation::where('token', $token)->first();

        $data = [];

        if ($conversation) {
            $conversation_details = ConversationDetail::where('conversation_id', $conversation->id)->get();
            if (count($conversation_details) > 0) {
                foreach ($conversation_details as $key => $value) {
                    $conversation_type_id = $value->conversation_type_id;
                    $message_body = $value->message_body;

                    if ($value->receive_status == 1) {
                        $user_ask = [
                            'receive_status' => 1,
                            'conversation_type_id' => $value->conversation_type_id,
                            'message_body' => $value->message_body,
                            'reply' => null,
                            'date' =>  $value->created_at,
                        ];
                        array_push($data, $user_ask);
                    }

                    if ($value->receive_status == 2) {
                        if ($value->conversation_type_id == 3) {
                            $chat_reply = [
                                'receive_status' => 2,
                                'conversation_type_id' => $value->conversation_type_id,
                                'message_body' => $value->message_body,
                                'reply' => null,
                                'date' =>  $value->created_at,
                            ];
                            array_push($data, $chat_reply);
                        }

                        if ($value->conversation_type_id == 2) {
                            $model = null;


                            //fetch question and conversation type
                            $conversation_type =  ConversationType::where('id', $value->conversation_type_id)->first();
                            $question = Question::where('id', $value->question_id)->first();
                            if ($question) {
                                $question = $question->question;
                            } else {
                                $question = '';
                            }

                            $model = Question::with(['attachment', 'question_mappings.products'])
                                ->whereHas('conversation_types', function ($query) use ($conversation_type) {
                                    $query->where('name', $conversation_type->name);
                                })
                                ->whereRaw('LOWER(question) like ?', ["%" . strtolower($question) . "%"])
                                ->first();

                            if ($model) {
                                $model = $model;
                            } else {
                                $model == null;
                            }

                            if ($model == null) {
                                $product_reply = [
                                    'receive_status' => 2,
                                    'conversation_type_id' => $value->conversation_type_id,
                                    'message_body' => $value->message_body,
                                    'reply' =>  "I didn't quite get that. Could you please clarify or ask in a different way?",
                                    'date' =>  $value->created_at,
                                ];
                                array_push($data, $product_reply);
                            } else {

                                $file = null;
                                $product = [];
                                $fetch_products = $model->question_mappings;
                                if (count($model->attachment) > 0) {
                                    $file =  env('APP_URL') . "/storage/attachments/" . $model->attachment->first()->file;
                                }

                                if (count($fetch_products) > 0) {
                                    foreach ($fetch_products as $key => $value) {
                                        $new_product = [
                                            'title' => "",
                                            'link' => ""
                                        ];

                                        $new_product['title'] = $value->products->title;
                                        $new_product['description'] = $value->products->description;
                                        $new_product['link'] = $value->products->link;
                                        $new_product['thumbnail'] =  env('APP_URL') . "/storage/attachments/" . $value->products->thumbnail;

                                        array_push($product,  $new_product);
                                    }
                                }

                                $product_reply1 = [
                                    'receive_status' => 2,
                                    'conversation_type_id' => $conversation_type_id,
                                    'message_body' => $message_body,
                                    'reply' => [
                                        'reply' => $model,
                                        'file' => $file,
                                        'product' => $product,
                                    ],
                                    'date' =>  $value->created_at,
                                ];

                                array_push($data, $product_reply1);
                            }
                        }

                        if ($value->conversation_type_id == 1) {
                            $reply = null;
                            $conversation_type =  ConversationType::where('id', $value->conversation_type_id)->first();
                            $question = Question::where('id', $value->question_id)->first();

                            if ($question) {
                                $question = $question->question;
                            } else {
                                $question = '';
                            }

                            $model = Question::with('attachment')
                                ->whereHas('conversation_types', function ($query) use ($conversation_type) {
                                    $query->where('name', $conversation_type->name);
                                })
                                ->whereRaw('LOWER(question) like ?', ["%" . strtolower($question) . "%"])
                                ->first();

                            if ($model) {
                                $model = $model;
                            } else {
                                $model == null;
                            }

                            if ($model == null) {
                                $faq_reply = [
                                    'receive_status' => 2,
                                    'conversation_type_id' => $value->conversation_type_id,
                                    'message_body' => $value->message_body,
                                    'reply' =>  "I didn't quite get that. Could you please clarify or ask in a different way?",
                                    'date' =>  $value->created_at,
                                ];
                                array_push($data, $faq_reply);
                            } else {

                                $faq_reply = [
                                    'receive_status' => 2,
                                    'conversation_type_id' => $value->conversation_type_id,
                                    'message_body' => $value->message_body,
                                    'reply' =>   new QuestionResource($model),
                                    'date' =>  $value->created_at,
                                ];
                                array_push($data, $faq_reply);
                            }
                        }
                    }
                }


                return $data;
            }
        }
        return  [];
    }

    public function get_live_chat_conversation_by_lead_id($lead_id)
    {
        $conversation_details = ConversationDetail::orderBy('id')
            ->where('lead_id', $lead_id)
            ->where('conversation_type_id', 3)
            ->get()
            ->groupBy('conversation_id');


        // $lead_call_logs = LeadCallLog::with('user')->whereIn('user_id', $cc_users)->whereBetween('created_at', [$start_date, $end_date])->get();

        // $results = [];

        // if ($lead_call_logs) {
        //     //formate data by date group
        //     $group_by_date_data = $lead_call_logs->groupBy(function ($item) {
        //         return $item->created_at->format('Y-m-d');
        //     });

        //     $results = $group_by_date_data->map(function ($groupData) {

        //         //formate data by user group
        //         $user_data = $groupData->groupBy('user_id');

        //         $conversation_data = $user_data->map(function ($conversation) {
        //             return $conversation->sortBy('conversion_type')->groupBy('conversion_type');
        //         });

        //         return $conversation_data;
        //     });
        // }



        if ($conversation_details) {
        } else {
            return [];
        }

        return $conversation_details;
    }

    public function temp_queue_assign()
    {
        $login_user_ids = [];

        $sessions = DB::table('sessions')->get();

        $login_user_ids = Session::whereNotNull('user_id')
            ->where('user_id', '<>', 1) // Exclude user ID 1
            ->distinct()
            ->pluck('user_id')->toArray();

        $associates_users = ConversationAssociate::whereHas(
            'conversation',
            function ($query) {
                $query->where('status', 2);
            },
        )->distinct()
            ->pluck('user_id')->toArray();

        $unique_ids = array_diff($login_user_ids, $associates_users);
        $unique_ids_array = array_values($unique_ids);

        if (count($unique_ids_array) > 0) {
            foreach ($unique_ids_array as $key => $user_id) {
                $temp_queue_conversation = TempQueueConversation::first();

                // Check for null in a single conditional statement
                if (!$temp_queue_conversation) {
                    continue; // Skip iteration if temp_queue_conversation is null
                }

                $conversation = Conversation::with('leads')->where('id', $temp_queue_conversation->conversation_id)->first();

                if ($conversation) {
                    // Update conversation status
                    $conversation->status = 2;
                    $conversation->save();

                    // Create conversation association
                    $assign_user = new ConversationAssociate();
                    $assign_user->conversation_id = $conversation->id;
                    $assign_user->user_id = $user_id;
                    $assign_user->save();

                    // Delete temporary queue conversation
                    TempQueueConversation::destroy($temp_queue_conversation->id);

                    NewConversationAttachEvent::dispatch($conversation, $user_id);
                    TempQueueConversationEvent::dispatch();
                    //agent notification send
                    ##not workable for php ,5.5 version on agent panel setup
                    $user_data = User::where('id', $user_id)->first();
                    if ($user_data) {
                        //AgentNotificationEvent::dispatch($user_data->email, $conversation->leads->phone, $conversation->token);

                        //agent notify created
                        $agent_notify_info = [
                            'lead_id' => $temp_queue_conversation->lead_id,
                            'user_id' => $user_id,
                            'conversation_id' => $temp_queue_conversation->conversation_id,
                        ];
                        $this->notify_service->agent_notify_create($agent_notify_info);
                    }
                    //agent status event call
                    $this->get_conversation_info_by_id($conversation->id);
                } else {
                    //nothing
                }
            }
        }
    }


    public function get_all_chats()
    {
        if (Auth::user()->hasRole('agent')) {
            return Conversation::whereHas('associates', function ($query) {
                $query->where('user_id', auth()->id());
            })->with([
                'leads',
                'conversation_details',
                'associates'
            ])->orderBy('id', 'DESC');
        } 

        return Conversation::with([
                'leads',
                'conversation_details',
                'associates'
            ])->orderBy('id', 'DESC');
    }

    public function get_live_chat_conversation_by_conversation_id($conversation_id)
    {

        $conversation_details = ConversationDetail::orderBy('id')
            ->where('conversation_id', $conversation_id)
            ->where('conversation_type_id', 3)
            ->get();
        return $conversation_details;
    }
    public function get_faq_chat_conversation_by_conversation_id($conversation_id)
    {
        $conversation_details = ConversationDetail::with('questions.attachment')->orderBy('id')
            ->where('conversation_id', $conversation_id)
            ->where('conversation_type_id', 1)
            ->get();
        return $conversation_details;
    }

    
    public function get_product_chat_conversation_by_conversation_id($conversation_id)
    {
        $conversation_details = ConversationDetail::with(['questions.attachment', 'questions.product_questions'])->orderBy('id')
            ->where('conversation_id', $conversation_id)
            ->where('conversation_type_id', 2)
            ->get();
        return $conversation_details;
    }

    public function get_all_chat_conversation_by_conversation_id($conversation_id)
    {
        $conversation_details = ConversationDetail::with(['questions.attachment', 'questions.product_questions'])->orderBy('id')
            ->where('conversation_id', $conversation_id)
            ->whereIn('conversation_type_id', [1, 2, 3])
            ->get();
        return $conversation_details;
    }
}