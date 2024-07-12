<?php
use App\Controller\{
    HomeController,
    UserController,
    APIController,
    AuthController
};
use App\Middleware\AuthMiddleware;
use Serapha\Routing\Route;

// Regular routes
Route::get('/', [HomeController::class]);
Route::middleware(AuthMiddleware::class)->get('/user/create', [UserController::class, 'create']);
Route::middleware(AuthMiddleware::class)->post('/user/create', [UserController::class, 'store']);
Route::get('/user/{id}', [UserController::class, 'show']);
Route::get('/login', [AuthController::class, 'index']);
Route::post('/login', [AuthController::class, 'store']);

// Middleware and group routes
Route::prefix('admin')->middleware(AuthMiddleware::class)->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard']);
    Route::get('/profile', [UserController::class, 'profile']);
    Route::get('/settings', [UserController::class, 'settings']);
});

// API routes
Route::prefix('api')->group(function () {
    Route::get('/user/{param}', [APIController::class, 'param'])->where('param', '[a-z]+');
    Route::get('/user/{id}/{name?}', [APIController::class, 'show'])->where(
        [
            'id' => '[0-9]+',
            'name' => '[a-zA-Z]+'
        ]
    );
    Route::get('/user/create', [APIController::class, 'index']);
});
