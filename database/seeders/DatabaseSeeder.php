<?php

namespace Database\Seeders;

use App\Models\ConversationAssociate;
use Illuminate\Database\Seeder;
use Database\Seeders\UserModelSeeder;
use Database\Seeders\QuestionModelSeeder;
use Database\Seeders\PermissionModelSeeder;
use Database\Seeders\ConversationTypeModelSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleModelSeeder::class,
            UserModelSeeder::class,
            PermissionModelSeeder::class,
            ConversationTypeModelSeeder::class,
            QuestionModelSeeder::class,
            // ProductModelSeeder::class,
            // ProductQuestionMappingModelSeeder::class,
            LeadModelSeeder::class,
            // ConversationModelSeeder::class,
            // ConversationAssociateModelSeeder::class,
        ]);
    }
}
