<?php

namespace Database\Seeders;

use App\Models\ConversationType;
use Illuminate\Database\Seeder;

class ConversationTypeModelSeeder extends Seeder
{
    /**
     * Run the ConversationType seeds.
     * @return void
     */
    public function run()
    {
        //$conversation_types =['Faq','Product','Live Chat'];
        $conversation_types =['Faq','Product', 'Live-Chat'];

        foreach ($conversation_types as $key => $value) {
            ConversationType::create([
                'name' => $value,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
