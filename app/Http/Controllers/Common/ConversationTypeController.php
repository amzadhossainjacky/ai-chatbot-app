<?php

namespace App\Http\Controllers\Common;

use DataTables;
use Illuminate\Http\Request;
use App\Models\ConversationType;
use App\Services\QuestionService;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use App\Services\ConversationTypeService;
use Illuminate\Support\Facades\Validator;

class ConversationTypeController extends Controller
{
    ## Service properties
    private ConversationTypeService $conversation_type_service;
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
        $this->conversation_type_service = new ConversationTypeService();
    }

    /**
     * ConversationTypeController
     * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
     */
    public function index(Request $request)
    {
        try {

            $conversation_type_list = $this->conversation_type_service->get_conversation_type_lists();
            $user = $this->user_info;
            if ($request->ajax()) {
                return Datatables::of($conversation_type_list)
                    ->addIndexColumn()
                    ->addColumn('action', function ($conversation_type_list) use($user){
                        $btn ="";
                        if($user->can('conversation-type-edit')){
                            $btn = $btn. '<a href=' . route(\Request::segment(1) . '.conversation_types.edit', $conversation_type_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';

                        }
                        
                        return $btn;
                    })
                    ->rawColumns(['action'])
                    ->make(true);
            }

            return view('backend.common.conversation_types.index');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        try {
            // return $request->all();
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:3|max:100|unique:conversation_types',
            ]);

            if ($validator->fails()) {
                // return response()->json([
                //     'success' => false,
                //     'errors' => $validator->errors()->all()
                // ]);

                $errors = $validator->errors();
                $fieldErrors = [];

                // Loop through each field and collect errors
                foreach ($validator->errors()->messages() as $field => $fieldErrorsArray) {
                    $field_name = $field . '_error';
                    $fieldErrors[$field_name] = $fieldErrorsArray;
                }

                return response()->json([
                    'success' => false,
                    'errors' => $fieldErrors,
                ]);
            } else {
                $model = $this->conversation_type_service->create($request);

                if ($model) {
                    return response()->json(['success' => true]);
                } else {
                    return response()->json(['success' => false]);
                }
            }
        } catch (\Throwable $th) {
            return response()->json(['success' => false]);
        }
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $model = $this->conversation_type_service->edit($id);
            return view('backend.common.conversation_types.edit', compact('model'));
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inputs = [
            'name' => $request->name,
            'is_active' => $request->is_active,
        ];

        ## Validation rules
        $rules = [
            'name' => ['required', 'min:3', 'max:100', "unique:conversation_types,name,$id"]
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();
        try {

            $this->conversation_type_service->update($inputs, $id);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.conversation_types');
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
            'name.required' => 'Conversation type name required',
        ];
    }

    public function get_all_active_conversation_type()
    {
        $data = ConversationType::where('is_active', '=', 1)->get();
        try {
            if ($data) {
                return response()->json([
                    'success' => true,
                    'message' => 'Conversation types',
                    'data' => $data,
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Could not send the conversation types',
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
