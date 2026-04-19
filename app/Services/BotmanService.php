<?php

namespace App\Services;

use App\Models\Question;

/**
 * BotmanService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class BotmanService {
    /**
     * create role
     * @return \App\Models\mixed
     */
    public function ask_question($question){

        $model = Question::where('question', 'like', "%$question%")->first();

        if($model){
            return $model;
        }else{
            return NULL;
        }
    }
}
