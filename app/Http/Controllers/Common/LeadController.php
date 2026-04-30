<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use DataTables;
use App\Models\Lead;
use App\Services\LeadService;
use App\Services\ConversationService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LeadController extends Controller
{

    # Service properties
    private LeadService $lead_service;
    private ConversationService $conversation_service;
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

        $this->lead_service = new LeadService();
        $this->conversation_service = new ConversationService();
    }


    /**
     * LeadController
     * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
     */
    public function index(Request $request)
    {
        $lead_list = $this->lead_service->get_lead_lists();
        $user = $this->user_info;

        if ($request->ajax()) {
            return Datatables::of($lead_list)
                ->addIndexColumn()
                ->addColumn('conversation', function ($lead_list) use ($user) {
                    if ($user->can('lead-conversation')) {
                        $btn = '<a href=' . route(\Request::segment(1) . '.lead.conversations', $lead_list->id) . ' class="view-btn"><i class="bi bi-eye"></i></a>';
                        return $btn;
                    }
                })
                ->rawColumns(['conversation'])
                ->make(true);
        }

        return view('backend.common.leads.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * the specified resource from storage.
     * @param  int  $id lead id
     * @return \Illuminate\Http\Response
     */
    public function lead_conversations($id)
    {
        $conversations = $this->conversation_service->get_live_chat_conversation_by_lead_id($id);
        return view('backend.common.leads.conversation', compact('conversations'));
    }
}
