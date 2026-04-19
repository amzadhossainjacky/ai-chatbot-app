<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Product;
use App\Models\Question;
use App\Models\Attachment;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use BotMan\BotMan\Storages\Storage;

class ProductModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();
        for ($i = 0; $i < 10; $i++) {

            //image upload
                $imagePath = public_path('storage/attachments/product/product.png');

                $filename = basename($imagePath);

                // Create an instance of UploadedFile
                $input_file = new UploadedFile($imagePath, $filename);

                $disk = "attachments";
                $directory = "product";
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
            
                
            //image upload

            $question = Str::random(5);
            $rand = rand(0, 1);

            $model_created = Product::create([
                'user_id' => 1,
                'title' => $faker->title . $i,
                'description' => $question . $i,
                'link' => 'https://www.aiub.edu/academic-calendar',
                'is_active' => $rand,
                'thumbnail' => $single_attachment_array['file']
            ]);

        }
    }
}
