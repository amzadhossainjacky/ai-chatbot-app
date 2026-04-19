<?php

namespace App\Http\Controllers\Common;

use DataTables;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Services\UserService;
use App\Http\Controllers\Controller;
use Brian2694\Toastr\Facades\Toastr;
use Illuminate\Support\Facades\Auth;
use App\Rules\MobileNumberValidationRule;
use Illuminate\Support\Facades\Validator;


/**
 * UserController
 * @author Md. Amzad Hossain Jacky <amzadhossainjacky@gmail.com>
 */
class UserController extends Controller
{
    ## Service properties
    private UserService $user_service;
    private RoleService $role_service;
    private $user_info;

    /**
     * constructor method
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->user_service = new UserService();
        $this->role_service = new RoleService();
        
        $this->middleware(function ($request, $next) {
            $this->user_info = Auth::user();
            return $next($request);
        });

    }

    public function index(Request $request)
    {
        try {

            $user_list = $this->user_service->get_user_lists();
            $user = $this->user_info;

            if ($request->ajax()) {
                return Datatables::of($user_list)
                    ->addIndexColumn()
                    ->addColumn('action', function ($user_list) use($user){
                        if($user->can('user-edit')){
                            $btn = '<a href=' . route(\Request::segment(1) . '.users.edit', $user_list->id) . ' class="action-btn"><i class="bi bi-pen"></i></a>';
                            return $btn;
                        }
                        
                    })
                    ->addColumn('role', function($user_list){

                        return $user_list->getRoleNames()[0];
                    })
                    ->addColumn('status', function($user_list){

                        $active = '<span class="badge bg-success">Active</span>';

                        return $user_list->is_active ? $active : '<span class="badge bg-secondary">Inactive</span>';
                    })
                    ->rawColumns(['action','status','role'])
                    ->make(true);
            }

            return view('backend.common.users.index');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = $this->role_service->get_role_lists();
        return view('backend.common.users.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $inputs = [
            'name' => $request->name,
            'gender' => $request->gender,
            'role' => $request->role,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'password' => $request->password,
            'is_active' => $request->is_active,
        ];

        ## Validation rules
        $rules = [
            'name' => ['required', 'min:5', 'max:100'],
            'gender' => ['required'],
            'role' => ['required'],
            'email' => ['required', 'email', 'min:5', 'max:50', 'unique:users,email'],
            'mobile' => ['required', new MobileNumberValidationRule, 'unique:users,mobile'],
            'password' => ['required', 'min:8', 'max:100'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();

        
        try {
            $model_created = $this->user_service->create($inputs);

            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.users.create');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $model = $this->user_service->edit($id);
            $roles = $this->role_service->get_role_lists();

            return view('backend.common.users.edit', compact('model', 'roles'));
        } catch (\Throwable $th) {
           // Get the exception message
           $errorMessage = $th->getMessage();
           Toastr::error("Message: " . $errorMessage, "Error");
           return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
       
        $inputs = [
            'name' => $request->name,
            'gender' => $request->gender,
            'role' => $request->role,
            'email' => $request->email,
            'mobile' => $request->mobile,
            'is_active' => $request->is_active,
        ];


        if($request->password != null){
            $inputs = $inputs + ['password' => $request->password];
        }

        ## Validation rules
        $rules = [
            'name' => ['required', 'min:5', 'max:100'],
            'gender' => ['required'],
            'role' => ['required'],
            'email' => ['required', 'email', 'min:5', 'max:50', 'unique:users,email,' . $id],
            'mobile' => ['required', new MobileNumberValidationRule, 'unique:users,mobile,' . $id],
            'password' => ['sometimes', 'min:8', 'max:100'],
        ];

        ## Validate rules
        Validator::make(
            $inputs,
            $rules,
            $this->get_validation_error_message()
        )->validate();
        
        try {
            $model_updated = $this->user_service->update($inputs, $id);

            if( $model_updated == 'exist'){
                Toastr::error("Already exist phone number", "Success");
                return redirect()->route(\Request::segment(1) . '.users');
            }

            Toastr::success("Action successful", "Success");
            return redirect()->route(\Request::segment(1) . '.users');
        } catch (\Throwable $th) {
            // Get the exception message
            $errorMessage = $th->getMessage();
            Toastr::error("Message: " . $errorMessage, "Error");
            return redirect()->route(\Request::segment(1) . '.dashboard');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    /**
     * get_validation_error_message method sets and display validation error messages
     * @return array<string, mixed>
     */
    private function get_validation_error_message(): array
    {
        return [
            'name.required' => __('user name required'),
            'name.min' => __('user name') . ' ' . __('min length in characters', ['min' => ':min']),
            'name.max' => __('user name') . ' ' . __('max length in characters', ['max' => ':max']),
            'email.required' => __('user email required'),
            'email.min' => __('user email') . ' ' . __('min length in characters', ['min' => ':min']),
            'email.max' => __('user email') . ' ' . __('max length in characters', ['max' => ':max']),
            'email.unique' => __('user email') . ' ' . __('already exist'),
            'mobile.min' => __('user phone') . ' ' . __('min length in characters', ['min' => ':min']),
            'mobile.max' => __('user phone') . ' ' . __('max length in characters', ['max' => ':max']),
            'mobile.unique' => __('user phone') . ' ' . __('already exist'),
            'mobile.required' => __('user phone required'),
            'password.required' => __('user password required'),
            'is_active.required' => __('user') . ' ' . __('active status must be 0 or 1'),
            'roles.required' => __('user role required'),
            'role.required' => __('user role required'),

        ];
    }
}
