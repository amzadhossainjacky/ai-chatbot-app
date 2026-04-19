<?php

namespace App\Services;

use App\Models\Role;

/**
 * RoleService
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class RoleService {
    /**
     * create role
     * @param array $inputs
     * @return \App\Models\Role
     */
    public function create($inputs): Role {
        $permissions = $inputs['permissions'];
        unset($inputs['permissions']);

        $role_created = Role::Create(
            $inputs
        );

        if ($role_created) {
            $role_created->syncPermissions($permissions);
        }
        
        return $role_created;
    }

    /**
     * get_role_lists method returns list of roles
     * @return collection
     */
    public function get_role_lists() {
        return Role::all();
    }

    /**
     * edit role
     * @param array $id
     * @return \App\Models\Role
     */
    public function edit($id): Role {

        $data = Role::find($id);
        return $data;
    }

    /**
     * update role
     * @param array $inputs
     * @return \App\Models\Role
     */
    public function update($inputs, $id): Role {

        $permissions = $inputs['permissions'];
        $model_update = Role::find($id);
        $model_update->name = $inputs['name'];
        $model_update->route_segment = $inputs['route_segment'];
        $model_update->save();

         # Unset unwanted attributes from inputs for creating new task
         unset($inputs['permissions']);

         if ($model_update && count($permissions)) {
             $model_update->syncPermissions($permissions);
         }

        return $model_update;
    }

    /**
     * destroy role
     * @param array $inputs
     * @return \App\Models\void
     */
    public function destroy($id): Void {
        $model_destroy = Role::destroy($id);
    }

}