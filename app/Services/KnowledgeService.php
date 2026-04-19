<?php

namespace App\Services;

use App\Models\Knowledge;
use App\Models\Attachment;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

/**
 * KnowledgeService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class KnowledgeService
{

    /**
     * get_knowledge_lists method returns list of knowledge entries
     * @return collection
     */
    public function get_knowledge_lists()
    {
        return Knowledge::orderBy('id', 'DESC');
    }

    /**
     * create knowledge entry
     * @param array $inputs
     * @return \App\Models\Knowledge
     */
    public function create($inputs): Knowledge
    {
        
        $model_created = Knowledge::Create(
            $inputs
        );
        return $model_created;
    }

    /**
     * edit Knowledge
     * @param array $id
     * @return \App\Models\Knowledge
     */
    public function edit($id): Knowledge
    {
        $data = Knowledge::find($id);
        return $data;
    }

    /**
     * update Knowledge
     * @param array $inputs
     * @return \App\Models\Knowledge
     */
    public function update($inputs, $id): Knowledge
    {

        $model_update = Knowledge::find($id);
        $model_update->title = Str::title($inputs['title']);
        $model_update->description = $inputs['description'];
        $model_update->is_active = $inputs['is_active'];

        $model_update->save();

        return $model_update;
    }


    /**
     * fetching all active product knowledge entries by product 
     * @param array $inputs_question
     */
    public function get_all_active_product_knowledge($inputs_question)
    {
        $data = Knowledge::whereHas('conversation_types', function ($query) {
            $query->where('name', 'Product');
        })
            ->whereis_active(1)
            ->where(function ($query) use ($inputs_question) {
                $query->where('question', 'like', '%' . $inputs_question . '%');
            })->get([
                'id', 'question'
            ]);

        if ($data) {
            return $data;
        } else {
            return Knowledge::whereHas('conversation_types', function ($query) {
                $query->where('name', 'Product');
            })
                ->whereis_active(1)->get([
                    'id', 'question'
                ]);
        }

        return Knowledge::whereHas('conversation_types', function ($query) {
            $query->where('name', 'Product');
        })
            ->whereis_active(1)->get([
                'id', 'question'
            ]);
    }
}
