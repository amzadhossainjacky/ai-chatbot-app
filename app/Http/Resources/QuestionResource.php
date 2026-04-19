<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use PhpParser\JsonDecoder;

class QuestionResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request) {
        $file = null;
        $tags = null;
        if(count($this->attachment) > 0){
            $file = env('APP_URL') . "/storage/attachments/" . $this->attachment->first()->file;
        }
        if(($this->tags) !== NULL){
            $tags =  $this->tags;
        }
        return [
            'question' => $this->question,
            'reply' => $this->reply,
            'file' => $file,
            'tags' => $tags,
        ];
    }
}