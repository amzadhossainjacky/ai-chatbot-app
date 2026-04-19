<?php

use App\Http\Controllers\Api\Common\ApiConversationController;
use App\Http\Controllers\Api\Common\ApiNotifyController;
use App\Http\Controllers\Api\Common\ChatbotController;
use App\Http\Controllers\Api\Common\TokenController;
use App\Http\Controllers\Common\ConversationTypeController;
use App\Http\Controllers\Common\KnowledgeController;
use App\Models\ConversationType;
use App\Models\Knowledge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Route::get('/test', function (Request $request) {
//     dd('test api');
// });

## token generate
Route::post('/question', [ChatbotController::class, 'question']);
Route::post('/token', [TokenController::class, 'generate']);

## Conversations type
Route::get('/conversation-types', [ConversationTypeController::class, 'get_all_active_conversation_type']);

## Conversations
Route::post('/message-send', [ApiConversationController::class, 'message_send']);
Route::get('/temp-queue-conversation-assign', [ApiConversationController::class, 'temp_queue_conversation_assign']);
Route::post('/chatbot-close-conversation', [ApiConversationController::class, 'chatbot_close_conversation']);
Route::post('/agent-close-conversation', [ApiConversationController::class, 'agent_close_conversation']);
Route::post('/all-conversation-by-phone', [ApiConversationController::class, 'chatbot_all_conversation_by_phone']);

## Agent Notify
Route::get('/get-agent-notify', [ApiNotifyController::class, 'get_agent_notification']);

## Knlowledge
Route::get('/knowledge', [KnowledgeController::class, 'get_all_active_knowledge']);