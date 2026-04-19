<?php

namespace App\Services;

use Exception;
use App\Models\Question;
use App\Models\Attachment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductQuestionMapping;
use App\Http\Controllers\Common\ProductQuestionMappingController;

/**
 * ProductQuestionMappingService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ProductQuestionMappingService
{

    /**
     * get_product_question_mapping_lists method returns list of product_question_mapping_lists
     * @return collection
     */
    public function get_product_question_mapping_lists()
    {

        // return ProductQuestionMapping::with('questions', 'products')->orderBy('id', 'DESC')->get();

        //     $question_mappings = ProductQuestionMapping::with('questions', 'products')
        // ->groupBy('question_id')
        // ->orderBy('id', 'DESC')
        // ->get();

        // $questionMappings = ProductQuestionMapping::with('questions', 'products')
        // ->whereIn('id', function ($query) {
        //     $query->select(DB::raw('MAX(id)'))
        //         ->from('product_question_mappings')
        //         ->groupBy('product_id');
        // })
        // ->orderBy('id', 'DESC')
        // ->get();


        // $questionMappings = ProductQuestionMapping::with('questions', 'products')
        // ->whereIn('id', function ($query) {
        //     $query->select(DB::raw('MAX(id)'))
        //         ->from('product_question_mappings')
        //         ->groupBy('question_id');
        // })
        // ->orderBy('id', 'DESC')
        // ->get();

        $question_mappings = Question::with('question_mappings')->whereHas('question_mappings', function ($query) {
            $query->whereColumn('question_id', 'questions.id');
        });

        return $question_mappings;
    }

    /**
     * create product Question Mapping
     * @param array 
     * @return void
     */
    public function create($inputs): Void
    {
        $question = Question::find($inputs['question_id']);

        if ($question) {
            $mapping_created = $question->product_questions()->sync($inputs['product_id']);
        } else {
            throw new Exception('Question not found');
        }
    }

    /**
     * find Question from mapping
     * @param id 
     * @return String
     */
    public function exist_question($id): String
    {
        $exist_question = ProductQuestionMapping::where('question_id', '=', $id)->first();

        if ($exist_question) {
            return 'success';
        }

        return 'failed';
    }
}
