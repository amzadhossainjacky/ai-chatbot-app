<?php

namespace App\Services;

use App\Models\AgentNotify;

/**
 * NotifyService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class NotifyService {

    /**
     * get_conversation_type_lists method returns list of ConversationType
     * @return collection
     */
    public function get_agent_notify_lists() {
        return AgentNotify::orderBy('id', 'DESC');
    }

    /**
     * create agent notify
     * @param array $inputs
     * @return \App\Models\AgentNotify
     */
    public function agent_notify_create($inputs){

        $model_created = AgentNotify::Create([
            'lead_id' => $inputs['lead_id'],
            'user_id' => $inputs['user_id'],
            'conversation_id' => $inputs['conversation_id'],
        ]);

        return $model_created;
    }

    /**
     * update agent notify
     * @param int $id
     */
    public function agent_notify_update($id){

        $updated = AgentNotify::where('user_id', $id)
        ->where('is_read', 0) 
        ->update([
            'is_read' => 1, 
        ]);
    }

    /**
     * update agent notify
     * @param int $id
     */
    public function agent_notify_update_by_conversation_id($id){

        $updated = AgentNotify::where('conversation_id', $id)
        ->where('is_read', 0) 
        ->update([
            'is_read' => 1, 
        ]);
    }
}