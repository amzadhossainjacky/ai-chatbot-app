<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\ConversationType;
use App\Services\QuestionService;
use Brian2694\Toastr\Facades\Toastr;
use DataTables;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Exists;

/**
 * QuestionController
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class QuestionController extends Controller
{

    ## Service properties
    private QuestionService $question_service;
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
        $this->question_service = new QuestionService();
    }

    /**
     * return the list of the questions
     * @return void
     */
    public function index(Request $request)
    {
        try {

            $questions_list = $this->question_service->get_question_lists();
            $user = $this->user_info;
            if ($request->ajax()) {
                return Datatables::of($questions_list)
                    ->addIndexColumn()
                    ->addColumn('action', function ($questions_list)  use($user){
                        if($user->can('question-edit')){
                            $btn = '<a href=' . route(\Request::segment(1) . '.questions.edit', $questions_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';
                            return $btn;
                        } 
                    })

                    ->addColumn('attachment', function ($questions_list) {
                        if ($questions_list['attachment']->first()) {
                            $url = asset($questions_list['attachment']->first() ? "storage/attachments/" . $questions_list['attachment']->first()->file : 'uploads/employee/default.png');
                            return '<a href="' . $url . '" target="_blank"><img  src="' . $url . '"   height="50px" width="50px" ></a>';
                        }else{
                            return '<span class="badge bg-secondary">None</span>';
                        }
                    })
                    ->addColumn('menu_tags', function ($questions_list)  use($user){
                            return $questions_list->tags;
                    })
                    ->rawColumns(['action', 'attachment','menu_tags'])
                    ->make(true);
            }

            return view('backend.common.questions.index');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $conversation_types = ConversationType::where('is_active', 1)->get();
        return view('backend.common.questions.create', compact('conversation_types'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputs = [
            'question' => $request->question,
            'reply' => $request->reply,
            'conversation_type_id' => $request->conversation_type_id,
            'user_id' => Auth::id(),
            'is_active' => $request->is_active,
        ];

        ## check attachment add or not
        if (!empty($request->attachment)) {
            $inputs = $inputs + ['attachment' => $request->attachment];
        }

        ## check tags add or not
        if (!empty($request->tags) && ($request->conversation_type_id == 1)) {
            $inputs = $inputs + ['tags' => $request->tags];
        }

        ## Validation rules
        $rules = [
            'question' => ['required', 'min:3', 'max:100', 'unique:questions,question'],
            'reply' => ['required'],
            'conversation_type_id' => ['required'],
            'attachment' => ['sometimes', 'mimes:jpeg,jpg,png'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();

        try {
            $this->question_service->create($inputs);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.questions.create');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * get_validation_error_message method sets and display validation error messages
     * @return array<string, mixed>
     */
    private function get_validation_error_message(): array
    {
        return [
            'question.required' => 'Question name required',
            'reply.required' => 'Reply name required',
            'attachment.mimes' => 'Attachment extension should be jpeg,jpg,png.',
        ];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $model = $this->question_service->edit($id);
        } catch (\Throwable $th) {
           // Get the exception message
           $errorMessage = $th->getMessage();
           Toastr::error("Message: " . $errorMessage, "Error");
           return redirect()->route(\Request::segment(1) . '.dashboard');
        }
      
        return view('backend.common.questions.edit', compact('model'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inputs = [
            'question' => $request->question,
            'reply' => $request->reply,
            'is_active' => $request->is_active,
            'user_id' => Auth::id(),
        ];

        ## check attachment add or not
        if (!empty($request->attachment)) {
            $inputs = $inputs + ['attachment' => $request->attachment];
        }

        ## check tags add or not
        if (!empty($request->tags)) {
            $inputs = $inputs + ['tags' => $request->tags];
        }

        
        ## Validation rules
        $rules = [
            'question' => ['required', 'min:3', 'max:100', "unique:questions,question,$id"],
            'reply' => ['required'],
            'attachment' => ['sometimes', 'mimes:jpeg,jpg,png'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();
        try {
            $this->question_service->update($inputs, $id);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.questions');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * get_all_active_product_questions
     */
    public function get_all_active_product_questions(Request $request)
    {
        $question = "";
        if($request->has('q')){
            $question = $request->q;
            $questions_list = $this->question_service->get_all_active_product_questions($question);
        }

        $questions_list = $this->question_service->get_all_active_product_questions($question);

        return response()->json(['data' => $questions_list]);
    }

}
