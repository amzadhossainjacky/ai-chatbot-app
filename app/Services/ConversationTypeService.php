<?php

namespace App\Services;

use App\Models\ConversationType;

/**
 * ConversationTypeService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ConversationTypeService {

    /**
     * get_conversation_type_lists method returns list of ConversationType
     * @return collection
     */
    public function get_conversation_type_lists() {
        return ConversationType::whereIn('id', [1,3])->orderBy('id', 'DESC')->get();
    }

    /**
     * create conversation type
     * @param array $inputs
     * @return \App\Models\ConversationType
     */
    public function create($inputs){

        $model_created = ConversationType::Create([
            'name' => $inputs['name'],
            'is_active' =>  1,
        ]);

        return $model_created;
    }

    /**
     * edit conversation type
     * @param array $id
     * @return \App\Models\ConversationType
     */
    public function edit($id): ConversationType {
        $model = ConversationType::find($id);
        return $model;
    }

    /**
     * update conversation type
     * @param array $inputs
     * @return \App\Models\ConversationType
     */
    public function update($inputs, $id): ConversationType {
        
        $model_update = ConversationType::find($id);
        $model_update->name = $inputs['name'];
        $model_update->is_active = $inputs['is_active'];
        $model_update->save();

        return $model_update;
    }

}