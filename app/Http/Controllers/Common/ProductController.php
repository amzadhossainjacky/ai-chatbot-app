<?php

namespace App\Http\Controllers\Common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DataTables;
use App\Services\ProductService;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * ProductController
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ProductController extends Controller
{
    ## Service properties
    private ProductService $product_service;
    private $user_info;

    /**
     * constructor method
     * @return void
     */
    public function __construct()
    {
        $this->product_service = new ProductService();
        
        $this->middleware(function ($request, $next) {
            $this->user_info = Auth::user();
            return $next($request);
        });
        
    }

    public function index(Request $request)
    {
        try {

            $product_list = $this->product_service->get_product_lists(); 
            $user = $this->user_info;

            if ($request->ajax()) {
                return Datatables::of($product_list)
                    ->addIndexColumn()
                    ->addColumn('action', function ($product_list)  use($user){
                        if($user->can('product-edit')){
                            $btn = '<a href=' . route(\Request::segment(1) . '.products.edit', $product_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';

                            return $btn;
                        }
                    })->addColumn('attachment', function ($product_list){
                        if ($product_list->thumbnail) {
                            $url = asset("storage/attachments/" . $product_list->thumbnail);
                            return '<a href="' . $url . '" target="_blank"><img  src="' . $url . '"   height="50px" width="50px" ></a>';
                        }else{
                            return '<span class="badge bg-secondary">None</span>';
                        }
                    })
                    ->rawColumns(['action','attachment'])
                    ->make(true);
            }

            return view('backend.common.products.index');
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
            $validator = Validator::make($request->all(), [
                'title' => 'required|min:3|max:100|unique:products',
                'description' => 'required',
                'link' => 'sometimes|min:3|max:250',
                'attachment' => 'required|mimes:jpeg,jpg,png',
            ]);

            if ($validator->fails()) {

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

                $data = [
                    'title' => $request->title,
                    'description' =>  $request->description,
                    'user_id' =>  Auth::id(),
                    'is_active' => $request->is_active,
                ];

                if (!empty($request->attachment)) {
                    $data = $data + ['attachment' => $request->attachment];
                }

                if (!empty($request->link)) {
                    $data = $data + ['link' => $request->link];
                }

                //store product
                $model = $this->product_service->create($data);

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
     * get_all_active_products
     */
    public function get_all_active_products(Request $request)
    {
        $product = "";
        if($request->has('q')){
            $product = $request->q;
            $product_list = $this->product_service->get_all_active_products($product);
        }

        $product_list = $this->product_service->get_all_active_products($product);

        return response()->json(['data' => $product_list]);
    }

    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {  

        try {
            $model = $this->product_service->edit($id);
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
        
        return view('backend.common.products.edit', compact('model'));
    }

     /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {

        try {

            $inputs = [
                'title' => $request->title,
                'description' =>  $request->description,
                'user_id' =>  Auth::id(),
                'is_active' => $request->is_active,
            ];
    
            if (!empty($request->attachment)) {
                $inputs = $inputs + ['attachment' => $request->attachment];
            }
    
            if (!empty($request->link)) {
                $inputs = $inputs + ['link' => $request->link];
            }
    
            ## Validation rules
            $rules = [
                'title' => ['required', 'min:3', 'max:100', "unique:products,title,$id"],
                'description' => ['required'],
                'link' => ['sometimes', 'min:3', 'max:250'],
                'attachment' => ['sometimes', 'mimes:jpeg,jpg,png']
            ];
    
            ## Validate rules
            Validator::make(
                $inputs,
                $rules,
                $this->get_validation_error_message()
            )->validate();

            $this->product_service->update($inputs, $id);
            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.products');
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
    private function get_validation_error_message(): array {
        return [
            'title.required' => 'Product title required',
            'description.required' => 'Product description required',
        ];
    }
}
