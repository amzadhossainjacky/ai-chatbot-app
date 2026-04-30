<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $password = '12345678';
        $sso_auth_pass = 'Helpdesk@123';
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make($password),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ticketadmin',
                'email' => 'ticketadmin@getnada.com',
                'password' => Hash::make($sso_auth_pass),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        
        foreach ($users as $key => $user) {
            $user = User::create($user);
            $user->assignRole(1);
        }

        $users2 = [
            [
                'name' => 'bot',
                'email' => 'bot@gmail.com',
                'password' => Hash::make($password),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($users2 as $key => $user) {
            $user = User::create($user);
            $user->assignRole(2);
        }

        $users3 = [
            [
                'name' => 'agent',
                'email' => 'agent@gmail.com',
                'password' => Hash::make($password),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'agent2',
                'email' => 'agent2@gmail.com',
                'password' => Hash::make($password),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ticketagent',
                'email' => 'ticketagent@getnada.com',
                'password' => Hash::make($sso_auth_pass),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];
        
        foreach ($users3 as $key => $user) {
            $user = User::create($user);
            $user->assignRole(3);
        }

        $users4 = [
            [
                'name' => 'groupadmin',
                'email' => 'groupadmin@gmail.com',
                'password' => Hash::make($password),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'ticketgroupadmin',
                'email' => 'ticketgroupadmin@getnada.com',
                'password' => Hash::make($sso_auth_pass),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($users4 as $key => $user) {
            $user = User::create($user);
            $user->assignRole(4);
        }
    }
}
