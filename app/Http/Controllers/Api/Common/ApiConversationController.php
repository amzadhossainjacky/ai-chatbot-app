<?php

namespace App\Http\Controllers\Api\Common;

use App\Models\User;
use App\Models\Session;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Services\NotifyService;
use App\Events\MessageSendEvent;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\ConversationAssociate;
use App\Models\TempQueueConversation;
use App\Services\ConversationService;
use App\Events\AgentNotificationEvent;
use App\Events\AgentNotificationRemoveEvent;
use App\Events\ConversationCloseEvent;
use App\Events\ConversationStatusEvent;
use App\Events\NewConversationAttachEvent;
use App\Events\TempQueueConversationEvent;

class ApiConversationController extends Controller
{
    ## Service properties
    private ConversationService $conversation_service;
    private NotifyService $notify_service;

    protected $question;

    /**
     * constructor method
     * @return void
     */
    public function __construct()
    {
        $this->conversation_service = new ConversationService();
        $this->notify_service = new NotifyService();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function message_send(Request $request)
    {
        $broadcast_channel = $request->token;
        $conversation_id = $request->conversation_id;

        $this->conversation_service->agent_reply_live_chat_question($request);

        MessageSendEvent::dispatch($request->message, $broadcast_channel);

        return response()->json([
            'success' => true,
            'message' => 'successfully send message',
            'data' => $request->message,
        ], 200);
    }

    /**
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function temp_queue_conversation_assign()
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
                    if($user_data){
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
                    $this->conversation_service->get_conversation_info_by_id($conversation->id);
                } else {
                    //nothing
                }
            }
        }
    }

    public function chatbot_close_conversation(Request $request)
    {
        $conversation = Conversation::with('agent_notify')->where('token', $request->token)->first();

        if ($conversation) {
            $conversation->status = 4;
            $conversation->save();

            // Delete temporary queue conversation
            TempQueueConversation::where('token', $request->token)->delete();
            //close status updated
            ConversationStatusEvent::dispatch(4, $conversation->id);
            $this->conversation_service->get_conversation_info_by_id($conversation->id);
            $this->notify_service->agent_notify_update_by_conversation_id($conversation->id);

            //remove agent panel notification
            //not workable for php, 5.5 version on agent panel setup
            // AgentNotificationRemoveEvent::dispatch($conversation->agent_notify->users->email, $conversation->token);
        }

        return response()->json([
            'success' => true,
            'message' => 'successfully close conversation',
            'data' => $conversation,
        ], 200);
    }

    public function chatbot_all_conversation_by_phone(Request $request)
    {

        $data = $this->conversation_service->all_conversation_by_phone($request);

        return response()->json([
            'success' => true,
            'message' => 'successfully send message',
            'data' => $data,
        ], 200);
    }

    public function agent_close_conversation(Request $request)
    {
        $conversation = Conversation::with('agent_notify')->where('token', $request->token)->first();

        if ($conversation) {
            $conversation->status = 4;
            $conversation->save();

            // Delete temporary queue conversation
            TempQueueConversation::where('token', $request->token)->delete();
            //close status updated
            ConversationCloseEvent::dispatch($request->token);
            $this->conversation_service->get_conversation_info_by_id($conversation->id);
            $this->notify_service->agent_notify_update_by_conversation_id($conversation->id);
            //remove agent panel notification
            //not workable for php, 5.5 version on agent panel setup
            ///AgentNotificationRemoveEvent::dispatch($conversation->agent_notify->users->email, $conversation->token);
        }

        return response()->json([
            'success' => true,
            'message' => 'successfully close conversation',
            'data' => $conversation,
        ], 200);
    }
}
