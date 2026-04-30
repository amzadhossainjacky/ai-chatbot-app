<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfAuthenticated {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string[]|null  ...$guards
     * @return mixed
     */
    public function handle($request, Closure $next, ...$guards) {
        // $guards = empty($guards) ? [null] : $guards;

        // foreach ($guards as $guard) {
        //     if (Auth::guard($guard)->check()) {
        //         return redirect(RouteServiceProvider::HOME);
        //     }
        // }

        // return $next($request);

        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::check() && (Auth::user()->getRoleNames()[0] == 'TICKET_ADMIN')) {
                return redirect('TICKET_ADMIN/dashboard');
            }elseif (Auth::check() &&  (Auth::user()->getRoleNames()[0] == 'TICKET_GROUPADMIN')) {
                return redirect('TICKET_GROUPADMIN/dashboard');
            }elseif (Auth::check() &&  (Auth::user()->getRoleNames()[0] == 'TICKET_AGENT')) {
                return redirect('TICKET_AGENT/dashboard');
            }
            else{
                return $next($request);
            }

        }

        return $next($request);
    }
}