<?php

namespace App\Http\Controllers\Common;

use DataTables;
use App\Models\Conversation;
use Illuminate\Http\Request;
use App\Services\NotifyService;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use App\Services\ConversationService;
use Illuminate\Support\Facades\Validator;

class ConversationController extends Controller
{
    ## Service properties
    private ConversationService $conversation_service;
    private NotifyService $notify_service;
    private $user_info;

    /**
     * constructor method
     * @return void
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            $this->user_info = Auth::user();
            return $next($request);
        });
        $this->conversation_service = new ConversationService();
        $this->notify_service = new NotifyService();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $updated_agent_notify = $this->notify_service->agent_notify_update($this->user_info->id);
            $conversations = $this->conversation_service->get_active_conversation_list_by_user();
            $conversation_info = $this->conversation_service->get_conversation_info();

            return view('backend.common.conversations.index', compact('conversations', 'conversation_info'));
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    public function get_conversation_details(Request $request)
    {
        $conversation_details = $this->conversation_service->get_all_conversation_by_id($request->id, $request->conversation_status);
        return response()->json(['data' => $conversation_details]);
    }

    public function chats(Request $request)
    {
        $chat_list = $this->conversation_service->get_all_chats();


        if ($request->ajax()) {
            return Datatables::of($chat_list)
                ->addIndexColumn()
                ->addColumn('live_chat', function ($chat_list) {
                    $btn = '<a href=' . route(\Request::segment(1) . '.chat.live.conversations', $chat_list->id) . ' class="view-btn"><i class="bi bi-eye"></i></a>';

                    return $btn;
                })
                ->addColumn('faq_chat', function ($chat_list) {
                     $btn = '<a href=' . route(\Request::segment(1) . '.chat.faq.conversations', $chat_list->id) . ' class="view-btn"><i class="bi bi-eye"></i></a>';

                    return $btn;
                })
                ->addColumn('product_chat', function ($chat_list) {
                     $btn = '<a href=' . route(\Request::segment(1) . '.chat.product.conversations', $chat_list->id) . ' class="view-btn"><i class="bi bi-eye"></i></a>';

                    return $btn;
                })
                ->addColumn('all_chat', function ($chat_list) {
                     $btn = '<a href=' . route(\Request::segment(1) . '.chat.all.conversations', $chat_list->id) . ' class="view-btn"><i class="bi bi-eye"></i></a>';

                    return $btn;
                })
                ->addColumn('date', function ($chat_list) {
                    return _date_format($chat_list->created_at); // Formatted for display
                })
                ->addColumn('agent', function ($chat_list) {
                    return @$chat_list->associates->first()->name; 
                })
               ->rawColumns(['live_chat', 'faq_chat', 'product_chat', 'all_chat'])
                ->make(true);
        }

        return view('backend.common.chats.index');
    }


    /**
     * the specified resource from storage.
     * @param  int  $id lead id
     * @return \Illuminate\Http\Response
     */
    public function chat_live_conversations($id)
    {
        $conversations = $this->conversation_service->get_live_chat_conversation_by_conversation_id($id);
        return view('backend.common.chats.live_conversation', compact('conversations'));
    }


    /**
     * the specified resource from storage.
     * @param  int  $id lead id
     * @return \Illuminate\Http\Response
     */
    public function chat_faq_conversations($id)
    {
        $conversations = $this->conversation_service->get_faq_chat_conversation_by_conversation_id($id);
        return view('backend.common.chats.faq_conversation', compact('conversations'));
    }

    /**
     * the specified resource from storage.
     * @param  int  $id lead id
     * @return \Illuminate\Http\Response
     */
    public function chat_product_conversations($id)
    {
        $conversations = $this->conversation_service->get_product_chat_conversation_by_conversation_id($id);
        //dd($conversations);
        return view('backend.common.chats.product_conversation', compact('conversations'));
    }

    /**
     * the specified resource from storage.
     * @param  int  $id lead id
     * @return \Illuminate\Http\Response
     */
    public function chat_all_conversations($id)
    {
        $conversations = $this->conversation_service->get_all_chat_conversation_by_conversation_id($id);
        //dd($conversations);
        return view('backend.common.chats.all_conversation', compact('conversations'));
    }

    
}
