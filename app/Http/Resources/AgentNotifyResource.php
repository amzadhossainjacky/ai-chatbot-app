<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AgentNotifyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        
        return [
            'id' => $this->id,
            'agent_email' => @$this->users->email,
            'lead_phone' => @$this->leads->phone,
            'conversation_token' => @$this->conversations->token,
            'message' => 'Conversation assign to you',
        ];
    }
}
