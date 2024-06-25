<?php
/** @var \Serapha\Routing\Router $router */

$router->addRoute('GET', '/', 'HomeController@index');
$router->addRoute('GET', '/user/create', 'UserController@create');
$router->addRoute('POST', '/user/create', 'UserController@store');
$router->addRoute('GET', '/user/{id}', 'UserController@show');
$router->addRoute('GET', '/login', 'AuthController@index');
$router->addRoute('POST', '/login', 'AuthController'); // This will call index method as default
