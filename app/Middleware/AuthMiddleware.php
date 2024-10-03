<?php
namespace App\Middleware;

use Serapha\Routing\Response;
use Serapha\Routing\Request;
use Serapha\Routing\Handler;
use Serapha\Middleware\Middleware;
use carry0987\SessionManager\SessionManager;

class AuthMiddleware extends Middleware
{
    protected SessionManager $session;

    public function __construct(SessionManager $session)
    {
        $this->session = $session;
    }

    public function process(Request $request, Response $response, Handler $handler): Response
    {
        // Check if the user is logged in
        if (empty($this->session->get('user'))) {
            // If not logged in, redirect to the login page
            return $response->redirect('/login');
        }

        // If logged in, continue processing the request
        return $handler->handle($request, $response);
    }
}
