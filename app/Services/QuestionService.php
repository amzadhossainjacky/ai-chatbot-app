<?php

namespace App\Services;

use App\Models\Question;
use App\Models\Attachment;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

/**
 * QuestionService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class QuestionService
{

    /**
     * get_question_lists method returns list of roles
     * @return collection
     */
    public function get_question_lists()
    {
        return Question::with('conversation_types', 'attachment')->orderBy('id', 'DESC');
    }

    /**
     * create question
     * @param array $inputs
     * @return \App\Models\Question
     */
    public function create($inputs): Question
    {
        $input_file = "";

        ## check attachment add or not
        if (!empty($inputs['attachment'])) {
            $input_file = $inputs['attachment'];
            unset($inputs['attachment']);
        }

        $model_created = Question::Create(
            $inputs
        );

        if (!empty($input_file)) {

            $image = Image::make($input_file);

            $disk = "attachments";
            $directory = "question";
            $uuid = (string) Str::uuid();
            $now = date('Ymdhis');
            $extension = $input_file->getClientOriginalExtension();
            $file_name = _str_conversion(pathinfo($input_file->getClientOriginalName(), PATHINFO_FILENAME), 'strtolower', true, false);
            $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
            $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);

            $single_attachment_array = [
                "file" => "{$directory}/{$file}",
                "extension" => $extension,
                "original_file_name" => $original_file_name,
            ];
            ## Upload to local disk
            //$input_file->storeAs($directory, $file, $disk);
            $destinationPath = storage_path('app/public/attachments/question/');
            $image->resize(400, 300);
            $image->save($destinationPath . $file);

            ## Create new attachment
            $new_attachment = new Attachment($single_attachment_array);
            $model_created->attachment()->save($new_attachment);
        }
        return $model_created;
    }

    /**
     * edit question
     * @param array $id
     * @return \App\Models\Question
     */
    public function edit($id): Question
    {
        $data = Question::with('attachment', 'conversation_types')->find($id);
        return $data;
    }

    /**
     * update question
     * @param array $inputs
     * @return \App\Models\Question
     */
    public function update($inputs, $id): Question
    {

        $model_update = Question::with('attachment')->find($id);
        $model_update->question = $inputs['question'];
        $model_update->reply = $inputs['reply'];
        $model_update->is_active = $inputs['is_active'];

        if (isset($inputs['tags'])) {
            $model_update->tags = $inputs['tags'];
        }else{
            $model_update->tags = NULL;
        }

        $model_update->user_id = $inputs['user_id'];

        ## check attachment add or not
        if (!empty($inputs['attachment'])) {
            $input_file = $inputs['attachment'];

            unset($inputs['attachment']);

            //existing check
            $find_attachment =  $model_update->attachment->first();

            $image = Image::make($input_file);

            $disk = "attachments";
            $directory = "question";
            $uuid = (string) Str::uuid();
            $now = date('Ymdhis');
            $extension = $input_file->getClientOriginalExtension();
            $file_name = _str_conversion(pathinfo($input_file->getClientOriginalName(), PATHINFO_FILENAME), 'strtolower', true, false);
            $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
            $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);

            $single_attachment_array = [
                "file" => "{$directory}/{$file}",
                "extension" => $extension,
                "original_file_name" => $original_file_name,
            ];
            ## Upload to local disk
            $destinationPath = storage_path('app/public/attachments/question/');
            $image->resize(400, 300);
            $image->save($destinationPath . $file);

            if ($find_attachment !== null) {

                $path = storage_path()."/app/public/attachments/".$find_attachment->file;

                if (file_exists($path)) {
                    unlink($path);
                }
                
                $update_attachment = Attachment::find($find_attachment->id);
                if ($update_attachment) {
                    $update_attachment->file =  $single_attachment_array['file'];
                    $update_attachment->extension =  $single_attachment_array['extension'];
                    $update_attachment->original_file_name =  $single_attachment_array['original_file_name'];
                    $update_attachment->save();
                }
            } else {
                $new_attachment = new Attachment($single_attachment_array);
                $model_update->attachment()->save($new_attachment);
            }

        }

        $model_update->save();

        return $model_update;
    }


    /**
     * fetching all active product question by product 
     * @param array $inputs_question
     */
    public function get_all_active_product_questions($inputs_question)
    {
        $data = Question::whereHas('conversation_types', function ($query) {
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
            return Question::whereHas('conversation_types', function ($query) {
                $query->where('name', 'Product');
            })
                ->whereis_active(1)->get([
                    'id', 'question'
                ]);
        }

        return Question::whereHas('conversation_types', function ($query) {
            $query->where('name', 'Product');
        })
            ->whereis_active(1)->get([
                'id', 'question'
            ]);
    }
}
