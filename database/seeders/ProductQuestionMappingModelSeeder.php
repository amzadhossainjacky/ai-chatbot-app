<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Question;
use Illuminate\Database\Seeder;
use App\Models\ProductQuestionMapping;

class ProductQuestionMappingModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = Question::where('conversation_type_id', '=', 2)->get();

        foreach ($questions as $key => $value) {

            $rand = rand(1,3);

            $products = Product::inRandomOrder()->take($rand)->get();

            foreach ($products as $key => $product) {
                $model_created = ProductQuestionMapping::create([
                    'question_id' => $value->id,
                    'product_id' => $product->id,
                ]);
            }

            
        }
    }
}
