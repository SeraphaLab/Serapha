<?php
namespace App\Middleware;

use Serapha\Routing\Response;
use Serapha\Routing\Request;
use Serapha\Routing\Handler;
use Serapha\Middleware\Middleware;

class AuthMiddleware extends Middleware
{
    public function process(Request $request, Response $response, Handler $handler): Response
    {
        // Check if the user is logged in
        if (!isset($_SESSION['user'])) {
            // If not logged in, redirect to the login page
            return $response->redirect('/login');
        }

        // If logged in, continue processing the request
        return $handler->handle($request);
    }
}
