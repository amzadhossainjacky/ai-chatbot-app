<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

/**
 * ProductService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class ProductService
{

    /**
     * get_product_lists method returns list of Product
     * @return collection
     */
    public function get_product_lists()
    {
        return Product::orderBy('id', 'DESC');
    }

    /**
     * create product
     * @param array $inputs
     * @return \App\Models\Product
     */
    public function create($inputs)
    {
        $inputs = $inputs;
        $thumbnail = $inputs['attachment'];

        unset($inputs['attachment']);

         //attachment images
        if (!empty($thumbnail)) {
            // $input_file = $thumbnail;
            // $disk = "attachments";
            // $directory = "product";
            // $uuid = (string) Str::uuid();
            // $now = date('Ymdhis');
            // $extension = $input_file->getClientOriginalExtension();
            // $file_name = _str_conversion(pathinfo($input_file->getClientOriginalName(), PATHINFO_FILENAME), 'strtolower', true, false);
            // $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
            // $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);

            // $file_path = "{$directory}/{$file}";
            // ## Upload to local disk
            // $input_file->storeAs($directory, $file, $disk);

            //$inputs = $inputs + ['thumbnail' => $file_path];

            $input_file = $thumbnail;

            $image = Image::make($input_file);

            $disk = "attachments";
            $directory = "product";
            $uuid = (string) Str::uuid();
            $now = date('Ymdhis');
            $extension = $input_file->getClientOriginalExtension();
            $file_name = _str_conversion(pathinfo($input_file->getClientOriginalName(), PATHINFO_FILENAME), 'strtolower', true, false);
            $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
            $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);
            $file_path = "{$directory}/{$file}";

            ## Upload to local disk
            $destinationPath = storage_path('app/public/attachments/product/');
            $image->resize(400, 300);
            $image->save($destinationPath.$file);

            $inputs = $inputs + ['thumbnail' => $file_path];
        }

        //product model created
        $model_created = Product::Create($inputs);

        return $model_created;
    }

    /**
     * fetching all active products
     * @param array $inputs_question
     */
    public function get_all_active_products($inputs_product)
    {

        $data = Product::whereis_active(1)
            ->where(function ($query) use ($inputs_product) {
                $query->where('title', 'like', '%' . $inputs_product . '%');
            })->get([
                'id', 'title'
            ]);
            
        if ($data) {
            return $data;
        } else {
            return Product::whereis_active(1)->get([
                'id', 'title'
            ]);
        }
        return Product::whereis_active(1)->get([
            'id', 'title'
        ]);
    }

    /**
     * edit product
     * @param array $id
     * @return \App\Models\Product
     */
    public function edit($id): Product {
        $model = Product::find($id);
        return $model;
    }

    /**
     * update product
     * @param array $inputs
     * @return \App\Models\Product
     */
    public function update($inputs, $id): Product {

        $inputs = $inputs;
        $model_updated = Product::find($id);


        if($model_updated){
    
            $model_updated->title = $inputs['title'];
            $model_updated->description = $inputs['description'];
            $model_updated->is_active = $inputs['is_active'];
            
            if (isset($inputs['link'])) {
                $model_updated->link = $inputs['link'];
            }else{
                $model_updated->link = NULL;
            }
            
            if (isset($inputs['attachment'])) {
                
                $thumbnail = $inputs['attachment'];
                if (!empty($thumbnail)) {

                    $disk = "attachments";

                    //remove existing thumbnail
                    $existing_file = $model_updated->thumbnail;
                    if (Storage::disk($disk)->exists($existing_file)) {
                        Storage::disk($disk)->delete($existing_file);
                    }

                    
                    $input_file = $thumbnail;
                    $image = Image::make($input_file);
        
                    $directory = "product";
                    $uuid = (string) Str::uuid();
                    $now = date('Ymdhis');
                    $extension = $input_file->getClientOriginalExtension();
                    $file_name = _str_conversion(pathinfo($input_file->getClientOriginalName(), PATHINFO_FILENAME), 'strtolower', true, false);
                    $original_file_name = _str_conversion($file_name, 'strtolower', false, true) . ".{$extension}";
                    $file = _str_conversion("{$file_name}_{$now}_{$uuid}.{$extension}", 'strtolower', false, true);
                    $file_path = "{$directory}/{$file}";
        
                    ## Upload to local disk
                    $destinationPath = storage_path('app/public/attachments/product/');
                    $image->resize(400, 300);
                    $image->save($destinationPath.$file);
        
                    $model_updated->thumbnail = $file_path;
                }
            } 

            $model_updated->save();
        }
       

        return $model_updated;
    }

}
