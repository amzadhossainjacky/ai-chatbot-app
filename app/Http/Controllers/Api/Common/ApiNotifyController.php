<?php

namespace App\Http\Controllers\Api\Common;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AgentNotifyResource;
use App\Models\AgentNotify;

class ApiNotifyController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function get_agent_notification(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $data = [];
        if($user){
            $notifications = AgentNotify::with('leads', 'users', 'conversations')->where('user_id', $user->id)->where('is_read', 0)->get();
            if($notifications){
                $data = AgentNotifyResource::collection($notifications);
            }
            return response()->json([
                'success' => true,
                'message' => 'successfully send message',
                'data' => $data,
            ], 200);
        }

        return response()->json([
            'success' => true,
            'message' => 'successfully send message',
            'data' => $data,
        ], 200);
    }

}
