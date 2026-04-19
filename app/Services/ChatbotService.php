<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\Question;
use App\Models\Conversation;
use App\Models\ConversationType;
use App\Models\ConversationDetail;
use App\Events\MessageReceiveEvent;
use App\Models\ConversationAssociate;
use App\Models\TempQueueConversation;
use App\Models\ProductQuestionMapping;
use App\Events\TempQueueConversationEvent;
use App\Http\Controllers\Common\ProductQuestionMappingController;

/**
 * ChatbotService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ChatbotService
{
    /**
     * create role
     * @return \App\Models\mixed
     */
    public function ask_question($question, $conversation_type, $phone)
    {
        //question fetch
        $model = Question::with('attachment')
            ->whereHas('conversation_types', function ($query) use ($conversation_type) {
                $query->where('name', $conversation_type);
            })
            ->whereRaw('LOWER(question) like ?', ["%" . strtolower($question) . "%"])
            ->first();

        //conversation type fetch
        $conversation_type = ConversationType::where('name', '=', $conversation_type)->first();
        $conversation_type_id = NULL;
        if ($conversation_type) {
            $conversation_type_id = $conversation_type->id;
        }
        

        //lead crate and fetch
        $lead = Lead::where('phone','=', $phone)->first();

        //null value check for lead
        if(($lead == null)){
            return 'error';
        }

        $pending_conversation = Conversation::where('status','!=', 4)->where('lead_id', $lead->id)->first();
        //null value check conversation 
        if(($pending_conversation == null)){
            return 'error';
        }
        
        if ($model) {
            if ($lead) {
                if ($pending_conversation) {
                    $chat_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => $model->id,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $question,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '1',
                        'is_read' => 1,
                    ]);

                    $bot_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => $model->id,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $model->reply,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '2',
                        'is_read' => 1,
                    ]); 
                }
            }
            return $model;
        } else {
            if ($lead) {
                if ($pending_conversation) {
                    $chat_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => NULL,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $question,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '1',
                        'is_read' => 1,
                    ]);
    
                    $bot_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => NULL,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => "I didn't quite get that. Could you please clarify or ask in a different way?",
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '2',
                        'is_read' => 1,
                    ]); 
                }
            }

            return NULL;
        }
    }

    public function ask_product_question($question, $conversation_type, $phone)
    {
        $model = Question::with(['attachment', 'question_mappings.products'])
            ->whereHas('conversation_types', function ($query) use ($conversation_type) {
                $query->where('name', $conversation_type);
            })
            ->whereRaw('LOWER(question) like ?', ["%" . strtolower($question) . "%"])
            ->first();

        //conversation type fetch
        $conversation_type = ConversationType::where('name', '=', $conversation_type)->first();
        $conversation_type_id = NULL;
        if ($conversation_type) {
            $conversation_type_id = $conversation_type->id;
        }

        //lead crate and fetch
        $lead = Lead::where('phone','=', $phone)->first();

        //null value check for lead
        if(($lead == null)){
            return 'error';
        }

        $pending_conversation = Conversation::where('status','!=', 4)->where('lead_id', $lead->id)->first();
        //null value check conversation 
        if(($pending_conversation == null)){
            return 'error';
        }

        if ($model) {
            if ($lead) {
                if ($pending_conversation) {
                    $chat_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => $model->id,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $question,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '1',
                        'is_read' => 1,
                    ]);

                    $bot_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => $model->id,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $model->reply,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '2',
                        'is_read' => 1,
                    ]); 
                }
            }
            return $model;
        } else {
            if ($lead) {
                if ($pending_conversation) {
                    $chat_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => NULL,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => $question,
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '1',
                        'is_read' => 1,
                    ]);
    
                    $bot_user_conversation = ConversationDetail::create([
                        'conversation_id' =>  $pending_conversation->id,
                        'question_id' => NULL,
                        'conversation_type_id' => $conversation_type_id,
                        'message_body' => "I didn't quite get that. Could you please clarify or ask in a different way?",
                        'lead_id' => $lead->id,
                        'user_id' => 2,
                        'receive_status' => '2',
                        'is_read' => 1,
                    ]); 
                }
            }

            return NULL;
        }
    }

    // public function ask_product_question($question, $conversation_type, $phone)
    // {
    //     $model = Question::with(['attachment', 'question_mappings.products'])
    //         ->whereHas('conversation_types', function ($query) use ($conversation_type) {
    //             $query->where('name', $conversation_type);
    //         })
    //         ->whereRaw('LOWER(question) like ?', ["%" . strtolower($question) . "%"])
    //         ->first();

    //     //return $model;
    //     $find_lead = Lead::where('phone', '=', $phone)->first();

    //     $lead = null;
    //     if ($find_lead) {
    //         $lead = $find_lead;
    //     } else {
    //         $lead_create = new Lead;
    //         $lead_create->phone = $phone;
    //         $lead_create->save();

    //         $lead = $lead_create;
    //     }

    //     //conversation type fetch
    //     $conversation_type = ConversationType::where('name', '=', $conversation_type)->first();
    //     $conversation_type_id = NULL;
    //     if ($conversation_type) {
    //         $conversation_type_id = $conversation_type->id;
    //     }

    //     if ($model) {
    //         if ($lead != null) {
    //             Conversation::create([
    //                 'lead_id' => $lead->id,
    //                 'question_id' => $model->id,
    //                 'conversation_type_id' => $conversation_type_id,
    //                 'user_ask_question' => $question,
    //                 'non_question_response' => NULL,
    //             ]);
    //         }
    //         return $model;
    //     } else {
    //         Conversation::create([
    //             'lead_id' => $lead->id,
    //             'question_id' => NULL,
    //             'conversation_type_id' => $conversation_type_id,
    //             'user_ask_question' => $question,
    //             'non_question_response' => "I didn't quite get that. Could you please clarify or ask in a different way?",
    //         ]);
    //         return NULL;
    //     }
    // }

    public function ask_live_chat_question($question, $conversation_type, $phone)
    {
        //conversation type fetch
        $conversation_type = ConversationType::where('name', '=', $conversation_type)->first();
        $conversation_type_id = NULL; 
        if ($conversation_type) {
            $conversation_type_id = $conversation_type->id;
        }

        //lead crate and fetch
        $lead = Lead::where('phone','=', $phone)->first();

        //null value check for lead
        if(($lead == null)){
            return 'error';
        }

        $pending_conversation = Conversation::where('status','!=', 4)->where('lead_id', $lead->id)->first();
        //null value check conversation 
        if(($pending_conversation == null)){
            return 'error';
        }

        //temporary conversation created
        if($pending_conversation->status = 1){
            $find_conversation = ConversationAssociate::where('conversation_id', $pending_conversation->id)->first();
            if(!$find_conversation){
                $find_temp_conversation = TempQueueConversation::where('conversation_id', $pending_conversation->id)->first();
                if(!$find_temp_conversation){
                    //temporary conversation created
                    $temp_conversation = TempQueueConversation::create([
                        'token' =>  $pending_conversation->token,
                        'status' => 1,
                        'lead_id' => $pending_conversation->lead_id,
                        'conversation_id' => $pending_conversation->id,
                    ]);
                    
                    if($temp_conversation){
                        TempQueueConversationEvent::dispatch();
                    }
                }
            }
        }
        


        if ($lead) {

            MessageReceiveEvent::dispatch($question, $pending_conversation->token);
            
            $chat_user_conversation = ConversationDetail::create([
                'conversation_id' =>  $pending_conversation->id,
                'question_id' => NULL,
                'conversation_type_id' => $conversation_type_id,
                'message_body' => $question,
                'lead_id' => $lead->id,
                'user_id' => NULL,
                'receive_status' => '1',
                'is_read' => 1,
            ]);
            
            return "broadcast";

        } else {

            return NULL;
        }
    }
}
