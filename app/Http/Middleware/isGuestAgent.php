<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class isGuestAgent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        //return $next($request);
        if (Auth::check() &&  (Auth::user()->getRoleNames()[0] == 'agent')) {
            return redirect('agent/conversations');
        }elseif(Auth::check() &&  (Auth::user()->getRoleNames()[0] == 'admin')){
            auth()->logout();
            $request->session()->flush();
        }

        return $next($request);
    }
}
