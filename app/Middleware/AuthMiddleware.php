<?php
namespace App\Middleware;

use Serapha\Middleware\MiddlewareInterface;
use Serapha\Routing\Request;
use Serapha\Routing\Response;

class AuthMiddleware implements MiddlewareInterface
{
    public function handle(Request $request, Response $response, callable $next): Response
    {
        // Check if the user is logged in
        if (!isset($_SESSION['user'])) {
            // If not logged in, redirect to the login page
            $response->redirect('/login');
            return $response;
        }

        // If logged in, continue processing the request
        return $next($request, $response);
    }
}
