<?php

namespace App\Services;

use App\Models\Module;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

/**
 * PermissionService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class PermissionService {

     /**
     * get_permission_lists method returns list of role permission in array
     * @param int $id
     * @return array
     */
    public function get_permission_lists(): array
    {
        return [
            'setting_menu' => [
                'parent_checked' => 1,
                'label' => 'setting menu permissions',
                'list' => [
                    ['name' => 'setting-menu-list', 'checked' => 1],
                ],
            ],
            'chat_menu' => [
                'parent_checked' => 1,
                'label' => 'chat menu permissions',
                'list' => [
                    ['name' => 'chat-menu-list', 'checked' => 1],
                ],
            ],
            'operation_menu' => [
                'parent_checked' => 1,
                'label' => 'operation menu permissions',
                'list' => [
                    ['name' => 'operation-menu-list', 'checked' => 1],
                ],
            ],
            // 'mapping_menu' => [
            //     'parent_checked' => 1,
            //     'label' => 'mapping menu permissions',
            //     'list' => [
            //         ['name' => 'mapping-menu-list', 'checked' => 1],
            //     ],
            // ],
            
            // 'product_question_mapping' => [
            //     'parent_checked' => 1,
            //     'label' => 'product question mapping permissions',
            //     'list' => [
            //         ['name' => 'product-question-mapping-list', 'checked' => 1],
            //         ['name' => 'product-question-mapping-create', 'checked' => 1],
            //     ],
            // ],
            'leads' => [
                'parent_checked' => 1,
                'label' => 'lead permissions',
                'list' => [
                    ['name' => 'lead-list', 'checked' => 1],
                ],
            ],
            'conversations' => [
                'parent_checked' => 1,
                'label' => 'conversation permissions',
                'list' => [
                    ['name' => 'conversation-list', 'checked' => 1],
                ],
            ],
            'chats' => [
                'parent_checked' => 1,
                'label' => 'chats permissions',
                'list' => [
                    ['name' => 'chat-list', 'checked' => 1],
                    ['name' => 'chat-live-conversation', 'checked' => 1],
                    ['name' => 'chat-faq-conversation', 'checked' => 1],
                    ['name' => 'chat-product-conversation', 'checked' => 1],
                    ['name' => 'chat-all-conversation', 'checked' => 1],
                ],
            ],
            // 'questions' => [
            //     'parent_checked' => 1,
            //     'label' => 'question permissions',
            //     'list' => [
            //         ['name' => 'question-list', 'checked' => 1],
            //         ['name' => 'question-create', 'checked' => 1],
            //         ['name' => 'question-edit', 'checked' => 1],
            //     ],
            // ],
            // 'products' => [
            //     'parent_checked' => 1,
            //     'label' => 'product permissions',
            //     'list' => [
            //         ['name' => 'product-list', 'checked' => 1],
            //         ['name' => 'product-create', 'checked' => 1],
            //         ['name' => 'product-edit', 'checked' => 1],
            //     ],
            // ],
            // 'conversation_types' => [
            //     'parent_checked' => 1,
            //     'label' => 'conversation type permissions',
            //     'list' => [
            //         ['name' => 'conversation-type-list', 'checked' => 1],
            //         ['name' => 'conversation-type-create', 'checked' => 1],
            //         ['name' => 'conversation-type-edit', 'checked' => 1],
            //     ],
            // ],
            'roles' => [
                'parent_checked' => 1,
                'label' => 'role permissions',
                'list' => [
                    ['name' => 'role-list', 'checked' => 1],
                    ['name' => 'role-create', 'checked' => 1],
                    ['name' => 'role-edit', 'checked' => 1],
                    ['name' => 'role-delete', 'checked' => 1],
                ],
            ],
            'users' => [
                'parent_checked' => 1,
                'label' => 'user permissions',
                'list' => [
                    ['name' => 'user-list', 'checked' => 1],
                    ['name' => 'user-create', 'checked' => 1],
                    ['name' => 'user-edit', 'checked' => 1],
                    ['name' => 'user-delete', 'checked' => 1],
                ],
            ],
            'knowledge' => [
                'parent_checked' => 1,
                'label' => 'knowledge permissions',
                'list' => [
                    ['name' => 'knowledge-list', 'checked' => 1],
                    ['name' => 'knowledge-create', 'checked' => 1],
                    ['name' => 'knowledge-edit', 'checked' => 1],
                    ['name' => 'knowledge-delete', 'checked' => 1],
                ],
            ],
        ];
    }

    /**
     * get_permission_lists method returns list of role permission in array
     * @param int $id
     * @return array
     */
    public function get_permission_lists_by_modules()
    {
        $modules = Module::with('permissions')->get();
        return $modules;
    }

    /**
     * get_db_permission_ds method returns list of permissions by associate role id 
     * @param int $id
     * @return array
     */
    public function get_db_role_permission_ds($id): array
    {
        $db_role_permission_ds = DB::table('role_has_permissions')->where('role_id', $id)->get()->pluck('permission_id')->toArray();

        return $db_role_permission_ds;
    }
}