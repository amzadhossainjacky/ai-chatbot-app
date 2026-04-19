<?php

namespace App\Http\Controllers\Common;

use DataTables;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Validator;
use App\Services\ProductQuestionMappingService;

/**
 * ProductQuestionMappingController
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ProductQuestionMappingController extends Controller
{
    ## Service properties
    private ProductQuestionMappingService $product_question_mapping_service;

    /**
     * constructor method
     * @return void
     */
    public function __construct()
    {
        $this->product_question_mapping_service = new ProductQuestionMappingService();
    }


    public function index(Request $request)
    {
        try {
            $product_mapping_list = $this->product_question_mapping_service->get_product_question_mapping_lists();

            if ($request->ajax()) {
                return Datatables::of($product_mapping_list)
                    ->addIndexColumn()
                    // ->addColumn('action', function ($product_mapping_list) {
                    //     $btn = '<a href=' . route(\Request::segment(1) . '.products.edit', $product_mapping_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';

                    //     return $btn;
                    // })
                    ->addColumn('product_name', function ($product_mapping_list) {
                        $product = "";
                        if (count($product_mapping_list['question_mappings']) > 0) {
                            foreach ($product_mapping_list['question_mappings'] as $key => $value) {
                                $product .= '<span class="badge rounded-pill bg-secondary">' . $value->products->title . '</span> ';
                            }
                            return $product;
                        }
                    })
                    ->rawColumns(['action', 'product_name'])
                    ->make(true);
            }

            return view('backend.common.product_question_mapping.index');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.common.product_question_mapping.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $inputs = [
            'question_id' => $request->question_id,
            'product_id' => $request->product_id,
        ];

        ## Validation rules
        $rules = [
            'question_id' => ['required'],
            'product_id' => ['required'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();

        try {

            $is_exist_question = $this->product_question_mapping_service->exist_question($request->question_id);


            if ($is_exist_question == 'success') {
                Toastr::error("Question has already mapping.", "Error");
                return redirect()->route(\Request::segment(1) . '.product_question_mapping.create');
            }

            $model_created = $this->product_question_mapping_service->create($inputs);

            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.product_question_mapping.create');
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
            'question_id.required' => 'Question required',
            'product_id.required' => 'Product required',
        ];
    }
}
