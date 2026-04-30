<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'TICKET_ADMIN', 'route_segment' => 'TICKET_ADMIN'],
            ['name' => 'system', 'route_segment' => 'system'],
            ['name' => 'TICKET_AGENT', 'route_segment' => 'TICKET_AGENT'],
            ['name' => 'TICKET_GROUPADMIN', 'route_segment' => 'TICKET_GROUPADMIN'],
        ];

        foreach ($data as $item) {
            Role::create([
                'name' => $item['name'],
                'route_segment' => $item['route_segment'],
                'guard_name' => 'web',
                'is_active' => 1,
            ]);
        }
    }
}
