<?php

namespace Database\Seeders;

use App\Models\Lead;
use App\Models\Conversation;
use Illuminate\Database\Seeder;

class ConversationModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $leads = Lead::all();
        $conversations = array();

        foreach ($leads as $key => $lead) {
            $conversation = 
                [
                    'lead_id' => $lead->id,
                    'token' =>$lead->id._get_generate_token(),
                    'status' => 3,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            array_push($conversations, $conversation);
        }

        foreach ($conversations as $key => $conversation) {
            $conversation_create = Conversation::create($conversation);
        }
    }
}
