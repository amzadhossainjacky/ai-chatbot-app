<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Conversation;
use App\Models\ConversationAssociate;
use Illuminate\Database\Seeder;

class ConversationAssociateModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::whereHas('roles', function($query){
            $query->where('name', 'TICKET_AGENT');
        })->where(['is_active' => 1])->pluck('id')->toArray();

        $conversations = Conversation::whereIn('status', [1,2,3])->get();

        foreach ($conversations as $key => $conversation) {

            $con_asso = new ConversationAssociate();
            $con_asso->user_id = $users[array_rand($users)];
            $con_asso->conversation_id = $conversation->id;
            $con_asso->save();
            
        }

    }
}
