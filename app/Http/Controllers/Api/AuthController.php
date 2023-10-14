<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validate();
        /** @var \App|Model\User user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        // will become data for FE
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credential = $request->validate(); // email and password
        if (!Auth::attempt($credential)) {
            return response([
                'message' => 'Provided email address or password is incorrect'
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        // will become data for FE
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('', 204);
    }
}
