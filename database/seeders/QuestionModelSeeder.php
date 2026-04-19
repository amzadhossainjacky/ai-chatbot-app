<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Question;
use App\Models\Attachment;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use BotMan\BotMan\Storages\Storage;

class QuestionModelSeeder extends Seeder
{
    /**
     * Run the Questions seeds.
     *
     * @return void
     */
    public function run()
    {
        
        //default Faq created
        Question::create([
            'user_id' => 1,
            'question' => "Faq",
            'reply' => "Feel free to ask faq questions.",
            'conversation_type_id' => 1,
            'is_active' => 1
        ]);

        //default Product created
        // Question::create([
        //     'user_id' => 1,
        //     'question' => "Product",
        //     'reply' => "Feel free to ask product questions.",
        //     'conversation_type_id' => 2,
        //     'is_active' => 1
        // ]);

        //default Product created
        Question::create([
            'user_id' => 1,
            'question' => "Live-Chat",
            'reply' => "Please wait for few time to get reply.",
            'conversation_type_id' => 3,
            'is_active' => 1
        ]);


        $faker = Factory::create();
        for ($i = 0; $i < 20; $i++) {

            $question = Str::random(5);
            $rand = rand(0, 1);

            // $model_created = Question::create([
            //     'user_id' => 1,
            //     'question' => $faker->text . $i,
            //     'reply' => $question . $i,
            //     'conversation_type_id' => rand(1,2),
            //     'is_active' => $rand
            // ]);
            $model_created = Question::create([
                'user_id' => 1,
                'question' => $faker->text . $i,
                'reply' => $question . $i,
                'conversation_type_id' => 1,
                'is_active' => $rand
            ]);



            $imagePath = public_path('storage/attachments/question/jack.jpg');

            $filename = basename($imagePath);

            // Create an instance of UploadedFile
            $input_file = new UploadedFile($imagePath, $filename);

            ## Upload files/attachments
            if (!empty($input_file)) {
                $disk = "attachments";
                $directory = "question";
                $uuid = (string) Str::uuid();
                $now = date('Ymdhis');
                $extension = 'jpg';
                $file_name = _str_conversion(pathinfo('jack', PATHINFO_FILENAME), 'strtolower', true, false);
                $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
                $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);

                $single_attachment_array = [
                    "file" => "{$directory}/{$file}",
                    "extension" => $extension,
                    "original_file_name" => $original_file_name,
                ];
                ## Upload to local disk
                $input_file->storeAs($directory, $file, $disk);

                ## Create new attachment
                $new_attachment = new Attachment($single_attachment_array);
                $model_created->attachment()->save($new_attachment);
            }
        }

    }
}
