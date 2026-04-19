<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use App\Models\Knowledge;
use App\Services\KnowledgeService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Validator;
use DataTables;

class KnowledgeController extends Controller
{
     ## Service properties
    private KnowledgeService $knowledge_service;
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
        $this->knowledge_service = new KnowledgeService();
    }

    /**
     * return the list of the questions
     * @return void
     */
    public function index(Request $request)
    {
        try {

            $knowledge_list = $this->knowledge_service->get_knowledge_lists();
            $user = $this->user_info;
            if ($request->ajax()) {
                return Datatables::of($knowledge_list)
                    ->addIndexColumn()
                    ->addColumn('action', function ($knowledge_list)  use($user){
                        if($user->can('knowledge-edit')){
                            $btn = '<a href=' . route(\Request::segment(1) . '.knowledge.edit', $knowledge_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';
                            return $btn;
                        } 
                    })
                    ->rawColumns(['action'])
                    ->make(true);
            }

            return view('backend.common.knowledge.index');
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
        return view('backend.common.knowledge.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputs = [
            'title' => $request->title,
            'description' => $request->description,
            'is_active' => $request->is_active,
        ];


        ## Validation rules
        $rules = [
            'title' => ['required', 'min:3', 'max:100', 'unique:knowledge,title'],
            'description' => ['required'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();

        try {
            $this->knowledge_service->create($inputs);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.knowledge.create');
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
            'knowledge.required' => 'Knowledge title required',
            'description.required' => 'Description required',
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
            $model = $this->knowledge_service->edit($id);
        } catch (\Throwable $th) {
           // Get the exception message
           $errorMessage = $th->getMessage();
           Toastr::error("Message: " . $errorMessage, "Error");
           return redirect()->route(\Request::segment(1) . '.dashboard');
        }
      
        return view('backend.common.knowledge.edit', compact('model'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inputs = [
            'title' => $request->title,
            'description' => $request->description,
            'is_active' => $request->is_active,
        ];

        
        ## Validation rules
        $rules = [
            'title' => ['required', 'min:3', 'max:100', "unique:knowledge,title,$id"],
            'description' => ['required'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();
        try {
            $this->knowledge_service->update($inputs, $id);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.knowledge');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }



    public function get_all_active_knowledge()
    {
        $data = Knowledge::where('is_active', '=', 1)->get();
        try {
            if ($data) {
                return response()->json([
                    'success' => true,
                    'message' => 'Knowledge items retrieved successfully',
                    'data' => $data,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Could not retrieve knowledge items',
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

    /**
     * get_all_active_product_questions
     */
    // public function get_all_active_product_questions(Request $request)
    // {
    //     $question = "";
    //     if($request->has('q')){
    //         $question = $request->q;
    //         $questions_list = $this->knowledge_service->get_all_active_product_questions($question);
    //     }

    //     $questions_list = $this->knowledge_service->get_all_active_product_questions($question);

    //     return response()->json(['data' => $questions_list]);
    // }
}
