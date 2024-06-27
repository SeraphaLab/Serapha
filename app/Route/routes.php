<?php
/** @var \Serapha\Routing\Router $router */

use App\Controller\{
    HomeController,
    UserController,
    AuthController
};

$router->get('/', HomeController::class); // This will call index method as default
$router->get('/user/create', [UserController::class, 'create']);
$router->post('/user/create', [UserController::class, 'store']);
$router->addRoute('GET', '/user/{id}', [UserController::class, 'show']);
$router->addRoute('GET', '/login', [AuthController::class, 'index']);
$router->addRoute('POST', '/login', [AuthController::class]);
