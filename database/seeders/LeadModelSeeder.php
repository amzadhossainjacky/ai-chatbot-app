<?php

namespace Database\Seeders;

use App\Models\Lead;
use Illuminate\Database\Seeder;

class LeadModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $leads = [
            [
                'phone' => '01720089370',
                'name' => NULL,
                'email' => NULL,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phone' => '01720089371',
                'name' => NULL,
                'email' => NULL,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'phone' => '01720089372',
                'name' => NULL,
                'email' => NULL,
                'is_active' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($leads as $key => $lead) {
            $lead_create = Lead::create($lead);
        }
    }
}
