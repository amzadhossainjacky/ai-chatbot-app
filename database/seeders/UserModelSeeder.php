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
        $users = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make($password),
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
        ];
        
        foreach ($users3 as $key => $user) {
            $user = User::create($user);
            $user->assignRole(3);
        }
    }
}
