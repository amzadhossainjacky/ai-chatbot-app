<?php

namespace App\Http\Controllers\Api\Common;

use App\Events\TempQueueConversationEvent;
use App\Models\Lead;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\TempQueueConversation;

class TokenController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function generate(Request $request)
    {
        $phone = $request->phone;
        $find_lead = Lead::where('phone', '=', $phone)->first();

        if ($find_lead) {
            $pending_conversation = Conversation::where('status', '!=', 4)->where('lead_id', $find_lead->id)->first();

            if (!$pending_conversation) {
                //last conversation fetch for token generate
                $lastConversation = Conversation::orderBy('created_at', 'desc')->first();
                //token generate
                if ($lastConversation) {
                    $token = $lastConversation->id . _get_generate_token();
                } else {
                    $token = '0' . _get_generate_token();
                }

                $conversation = Conversation::create([
                    'token' =>  $token,
                    'status' => 1,
                    'lead_id' => $find_lead->id,
                ]);


                if($conversation){
                    return response()->json([
                        'success' => true,
                        'message' => 'token generate',
                        'data' => [
                            'token' => $conversation->token
                        ]
                    ], 200);
                }
            }

            if ($pending_conversation) {
                return response()->json([
                    'success' => true,
                    'message' => 'Continued',
                    'data' => [
                        'token' => $pending_conversation->token
                    ]
                ], 200);
            }
        } else {
            $lead_create = new Lead;
            $lead_create->phone = $phone;
            $lead_create->save();

            $lastConversation = Conversation::orderBy('created_at', 'desc')->first();
            //token generate
            if ($lastConversation) {
                $token = $lastConversation->id . _get_generate_token();
            } else {
                $token = '0' . _get_generate_token();
            }

            $conversation = Conversation::create([
                'token' =>  $token,
                'status' => 1,
                'lead_id' => $lead_create->id,
            ]);

            // if($conversation){
            //     //temporary conversation created
            //     $temp_conversation = TempQueueConversation::create([
            //         'token' =>  $conversation->token,
            //         'status' => 1,
            //         'lead_id' => $conversation->lead_id,
            //         'conversation_id' => $conversation->id,
            //     ]);

            //     if($temp_conversation){
            //         TempQueueConversationEvent::dispatch();
            //     }
            // }

            if($conversation){
                return response()->json([
                    'success' => true,
                    'message' => 'token generate',
                    'data' => [
                        'token' => $conversation->token
                    ]
                ], 200);
            }
        }
    }
}
