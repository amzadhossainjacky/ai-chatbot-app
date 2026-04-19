<?php

namespace App\Http\Controllers\Api\Common;

use Illuminate\Http\Request;
use App\Services\ChatbotService;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;

class ChatbotController extends Controller
{
    ## Service properties
    private ChatbotService $chatbot_service;

    protected $question;

    /**
     * constructor method
     * @return void
     */
    public function __construct()
    {
        $this->chatbot_service = new ChatbotService();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function question(Request $request)
    {
        $question = $request->q;
        $conversation_type = $request->conversation_type;
        $phone = $request->phone;

        try {
            //default product question 
            if ($conversation_type == "Product") {

                if ($request->has('q')) {
                    
                    $reply = $this->chatbot_service->ask_product_question($question, $conversation_type, $phone);

                    if ($reply == "error") {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => [
                                'reply' => "Something is wrong, please close the chat and start again.",
                            ],
                        ], 200);
                    }

                    if ($reply == null) {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => [
                                'reply' => "I didn't quite get that. Could you please clarify or ask in a different way?",
                            ],
                        ], 200);
                    } else {

                        $file = null;
                        $product = [];
                        $fetch_products = $reply->question_mappings;
                        if (count($reply->attachment) > 0) {
                            $file =  env('APP_URL') . "/storage/attachments/" . $reply->attachment->first()->file;
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

                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => [
                                'reply' => $reply->reply,
                                'file' => $file,
                                'product' => $product,
                            ],
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Could not send the questions',
                    ], 500);
                }
            }

            //default live chat question 
            if ($conversation_type == "Live-Chat") {

                if ($request->has('q')) {

                    $reply = $this->chatbot_service->ask_live_chat_question($question, $conversation_type, $phone);

                    if ($reply == "error") {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => [
                                'reply' => "Something is wrong, please close the chat and start again.",
                            ],
                        ], 200);
                    }

                    if ($reply == 'broadcast') {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => 'broadcast'
                        ], 200);
                    }

                    if ($reply == null) {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => [
                                'reply' => "I didn't quite get that. Could you please clarify or ask in a different way?",
                            ],
                        ], 200);
                    } else {
                        return response()->json([
                            'success' => true,
                            'message' => 'Question reply',
                            'data' => $reply
                        ], 200);
                    }
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Could not send the questions',
                    ], 500);
                }
            }

            if ($request->has('q')) {

                $reply = $this->chatbot_service->ask_question($question, $conversation_type, $phone);

                if ($reply == "error") {
                    return response()->json([
                        'success' => true,
                        'message' => 'Question reply',
                        'data' => [
                            'reply' => "Something is wrong, please close the chat and start again.",
                        ],
                    ], 200);
                }

                if ($reply == null) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Question reply',
                        'data' => [
                            'reply' => "I didn't quite get that. Could you please clarify or ask in a different way?",
                        ],
                    ], 200);
                } else {
                    return response()->json([
                        'success' => true,
                        'message' => 'Question reply',
                        'data' => new QuestionResource($reply)
                    ], 200);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Could not send the questions',
                ], 500);
            }
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Internal Server Error',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
