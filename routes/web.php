<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Api\Common\ApiConversationController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Common\ConversationController;
use App\Http\Controllers\Common\ConversationTypeController;
use App\Http\Controllers\Common\KnowledgeController;
use App\Http\Controllers\Common\LeadController;
use App\Http\Controllers\Common\ProductController;
use App\Http\Controllers\Common\ProductQuestionMappingController;
use App\Http\Controllers\Common\QuestionController;
use App\Http\Controllers\Common\RoleController;
use App\Http\Controllers\Common\UserController;
use App\Models\ConversationType;
use Illuminate\Support\Facades\Route;

/**
 * All web routes
 * @author Md. Amzad Hossain Jacky <amzadhossainajacky@gmail.com>
 */

/** Routes without middleware */

## login
Route::get('/login', [LoginController::class, 'index'])->name('login.index');
Route::redirect('/', 'login');
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

//for agent panel login
// Route::get('/user/login', [LoginController::class, 'user_login'])->name('user.login');
Route::middleware(['is_guest_agent'])->group(function () {
    Route::get('/user/login', [LoginController::class, 'user_login'])->name('user.login');
});

Route::match(['get', 'post'], '/botman', 'App\Http\Controllers\Common\BotManController@handle');

/** Admin Routes */
Route::group(['as' => 'admin.', 'prefix' => 'admin', 'middleware' => ['auth', 'is_admin']], function () {

    ## Dashboard
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
    });

    ## Role
    Route::controller(RoleController::class)->group(function () {
        Route::get('/roles', 'index')->name('roles')->middleware(['permission:role-list']);
        Route::get('/roles/create', 'create')->name('roles.create')->middleware(['permission:role-create']);
        Route::post('/roles/create', 'store')->name('roles.store');
        Route::get('/roles/edit/{id}', 'edit')->name('roles.edit')->middleware(['permission:role-edit']);
        Route::post('/roles/update/{id}', 'update')->name('roles.update');
        Route::get('/roles/destroy/{id}', 'destroy')->name('roles.destroy');
    });


    ## user
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index')->name('users')->middleware(['permission:user-list']);
        Route::get('/users/create', 'create')->name('users.create')->middleware(['permission:user-create']);
        Route::post('/users/create', 'store')->name('users.store');
        Route::get('/users/edit/{id}', 'edit')->name('users.edit')->middleware(['permission:user-edit']);
        Route::post('/users/update/{id}', 'update')->name('users.update');

        //ajax call
        Route::post('/users/create', 'store')->name('users.store');
    });


    ## Questions
    Route::controller(QuestionController::class)->group(function () {
        Route::get('/questions', 'index')->name('questions')->middleware(['permission:question-list']);
        Route::get('/questions/create', 'create')->name('questions.create')->middleware(['permission:question-create']);
        Route::post('/questions/create', 'store')->name('questions.store');
        Route::get('/questions/edit/{id}', 'edit')->name('questions.edit')->middleware(['permission:question-edit']);
        Route::post('/questions/update/{id}', 'update')->name('questions.update');
        Route::get('/questions/destroy/{id}', 'destroy')->name('questions.destroy');
        Route::post('/get-all-active-product-questions', 'get_all_active_product_questions')->name('get_all_active_product_questions');
    });

    ## ConversationType
    Route::controller(ConversationTypeController::class)->group(function () {
        Route::get('/conversation-types', 'index')->name('conversation_types')->middleware(['permission:conversation-type-list']);
        Route::get('/conversation-types/edit/{id}', 'edit')->name('conversation_types.edit')->middleware(['permission:conversation-type-edit']);
        Route::post('/conversation-types/update/{id}', 'update')->name('conversation_types.update');

        //ajax call
        Route::post('/conversation-types/create', 'store')->name('conversation_types.store');
    });

    ## product
    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index')->name('products')->middleware(['permission:product-list']);
        Route::get('/products/edit/{id}', 'edit')->name('products.edit')->middleware(['permission:product-edit']);
        Route::post('/products/update/{id}', 'update')->name('products.update');

        //ajax call
        Route::post('/products/create', 'store')->name('products.store');
        Route::post('/get-all-active-products', 'get_all_active_products')->name('get_all_active_products');
    });

    ## Product Question Mapping
    Route::controller(ProductQuestionMappingController::class)->group(function () {
        Route::get('/product-question-mapping', 'index')->name('product_question_mapping')->middleware(['permission:product-question-mapping-list']);
        Route::get('/product-question-mapping/create', 'create')->name('product_question_mapping.create')->middleware(['permission:product-question-mapping-create']);
        Route::get('/product-question-mapping/edit/{id}', 'edit')->name('product_question_mapping.edit')->middleware(['permission:product-question-mapping-edit']);
        Route::post('/product-question-mapping/update/{id}', 'update')->name('product_question_mapping.update');

        //ajax call
        Route::post('/product-question-mapping/create', 'store')->name('product_question_mapping.store');
    });
    

    ## Lead
    Route::controller(LeadController::class)->group(function () {
        Route::get('/leads', 'index')->name('leads')->middleware(['permission:lead-list']);
        Route::get('/leads/conversation/{id}', 'lead_conversations')->name('lead.conversations')->middleware(['permission:lead-conversation']);
    });

    
    ## Conversations
    Route::controller(ConversationController::class)->group(function () {
        Route::get('/conversations', 'index')->name('conversations')->middleware(['permission:conversation-list']);
        //ajax call
        Route::post('/conversations-details', 'get_conversation_details')->name('conversation.details');
    });

    ## Chat
    Route::controller(ConversationController::class)->group(function () {
        Route::get('/chats', 'chats')->name('chats')->middleware(['permission:chat-list']);
        Route::get('/chats/conversation/{id}', 'chat_live_conversations')->name('chat.live.conversations')->middleware(['permission:chat-live-conversation']);
        Route::get('/chats/faq-conversation/{id}', 'chat_faq_conversations')->name('chat.faq.conversations')->middleware(['permission:chat-faq-conversation']);
        Route::get('/chats/product-conversation/{id}', 'chat_product_conversations')->name('chat.product.conversations')->middleware(['permission:chat-product-conversation']);
        Route::get('/chats/all-conversation/{id}', 'chat_all_conversations')->name('chat.all.conversations')->middleware(['permission:chat-all-conversation']);
    });

    ## Knowledge
    Route::controller(KnowledgeController::class)->group(function () {
        Route::get('/knowledge', 'index')->name('knowledge')->middleware(['permission:knowledge-list']);
        Route::get('/knowledge/create', 'create')->name('knowledge.create')->middleware(['permission:knowledge-create']);
        Route::post('/knowledge/create', 'store')->name('knowledge.store');
        Route::get('/knowledge/edit/{id}', 'edit')->name('knowledge.edit')->middleware(['permission:knowledge-edit']);
        Route::post('/knowledge/update/{id}', 'update')->name('knowledge.update');
        Route::get('/knowledge/destroy/{id}', 'destroy')->name('knowledge.destroy');
       // Route::post('/get-all-active-product-questions', 'get_all_active_product_questions')->name('get_all_active_product_questions');
    });
   
});

Route::group(['as' => 'agent.', 'prefix' => 'agent', 'middleware' => ['auth', 'is_agent']], function () {

     ## Dashboard
     Route::controller(DashboardController::class)->group(function () {
        Route::get('/dashboard', 'index')->name('dashboard');
    });

    ## Role
    Route::controller(RoleController::class)->group(function () {
        Route::get('/roles', 'index')->name('roles')->middleware(['permission:role-list']);
        Route::get('/roles/create', 'create')->name('roles.create')->middleware(['permission:role-create']);
        Route::post('/roles/create', 'store')->name('roles.store');
        Route::get('/roles/edit/{id}', 'edit')->name('roles.edit')->middleware(['permission:role-edit']);
        Route::post('/roles/update/{id}', 'update')->name('roles.update');
        Route::get('/roles/destroy/{id}', 'destroy')->name('roles.destroy');
    });


    ## user
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index')->name('users')->middleware(['permission:user-list']);
        Route::get('/users/create', 'create')->name('users.create')->middleware(['permission:user-create']);
        Route::post('/users/create', 'store')->name('users.store');
        Route::get('/users/edit/{id}', 'edit')->name('users.edit')->middleware(['permission:user-edit']);
        Route::post('/users/update/{id}', 'update')->name('users.update');

        //ajax call
        Route::post('/users/create', 'store')->name('users.store');
    });


    ## Questions
    Route::controller(QuestionController::class)->group(function () {
        Route::get('/questions', 'index')->name('questions')->middleware(['permission:question-list']);
        Route::get('/questions/create', 'create')->name('questions.create')->middleware(['permission:question-create']);
        Route::post('/questions/create', 'store')->name('questions.store');
        Route::get('/questions/edit/{id}', 'edit')->name('questions.edit')->middleware(['permission:question-edit']);
        Route::post('/questions/update/{id}', 'update')->name('questions.update');
        Route::get('/questions/destroy/{id}', 'destroy')->name('questions.destroy');
        Route::post('/get-all-active-product-questions', 'get_all_active_product_questions')->name('get_all_active_product_questions');
    });

    ## ConversationType
    Route::controller(ConversationTypeController::class)->group(function () {
        Route::get('/conversation-types', 'index')->name('conversation_types')->middleware(['permission:conversation-type-list']);
        Route::get('/conversation-types/edit/{id}', 'edit')->name('conversation_types.edit')->middleware(['permission:conversation-type-edit']);
        Route::post('/conversation-types/update/{id}', 'update')->name('conversation_types.update');

        //ajax call
        Route::post('/conversation-types/create', 'store')->name('conversation_types.store');
    });

    ## product
    Route::controller(ProductController::class)->group(function () {
        Route::get('/products', 'index')->name('products')->middleware(['permission:product-list']);
        Route::get('/products/edit/{id}', 'edit')->name('products.edit')->middleware(['permission:product-edit']);
        Route::post('/products/update/{id}', 'update')->name('products.update');

        //ajax call
        Route::post('/products/create', 'store')->name('products.store');
        Route::post('/get-all-active-products', 'get_all_active_products')->name('get_all_active_products');
    });

    ## Product Question Mapping
    Route::controller(ProductQuestionMappingController::class)->group(function () {
        Route::get('/product-question-mapping', 'index')->name('product_question_mapping')->middleware(['permission:product-question-mapping-list']);
        Route::get('/product-question-mapping/create', 'create')->name('product_question_mapping.create')->middleware(['permission:product-question-mapping-create']);
        Route::get('/product-question-mapping/edit/{id}', 'edit')->name('product_question_mapping.edit')->middleware(['permission:product-question-mapping-edit']);
        Route::post('/product-question-mapping/update/{id}', 'update')->name('product_question_mapping.update');

        //ajax call
        Route::post('/product-question-mapping/create', 'store')->name('product_question_mapping.store');
    });

    ## Lead
    Route::controller(LeadController::class)->group(function () {
        Route::get('/leads', 'index')->name('leads')->middleware(['permission:lead-list']);
    });

    ## Conversations
    Route::controller(ConversationController::class)->group(function () {
        Route::get('/conversations', 'index')->name('conversations')->middleware(['permission:conversation-list']);
        //ajax call
        Route::post('/conversations-details', 'get_conversation_details')->name('conversation.details');
    });

    ## Chat
    Route::controller(ConversationController::class)->group(function () {
        Route::get('/chats', 'chats')->name('chats')->middleware(['permission:chat-list']);
        
        Route::get('/chats/conversation/{id}', 'chat_live_conversations')->name('chat.live.conversations')->middleware(['permission:chat-live-conversation']);
        Route::get('/chats/faq-conversation/{id}', 'chat_faq_conversations')->name('chat.faq.conversations')->middleware(['permission:chat-faq-conversation']);
        Route::get('/chats/product-conversation/{id}', 'chat_product_conversations')->name('chat.product.conversations')->middleware(['permission:chat-product-conversation']);
        Route::get('/chats/all-conversation/{id}', 'chat_all_conversations')->name('chat.all.conversations')->middleware(['permission:chat-all-conversation']);
    });

    Route::controller(KnowledgeController::class)->group(function () {
        Route::get('/knowledge', 'index')->name('knowledge')->middleware(['permission:knowledge-list']);
        Route::get('/knowledge/create', 'create')->name('knowledge.create')->middleware(['permission:knowledge-create']);
        Route::post('/knowledge/create', 'store')->name('knowledge.store');
        Route::get('/knowledge/edit/{id}', 'edit')->name('knowledge.edit')->middleware(['permission:knowledge-edit']);
        Route::post('/knowledge/update/{id}', 'update')->name('knowledge.update');
        Route::get('/knowledge/destroy/{id}', 'destroy')->name('knowledge.destroy');
       // Route::post('/get-all-active-product-questions', 'get_all_active_product_questions')->name('get_all_active_product_questions');
    });

});
