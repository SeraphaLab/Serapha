<?php
namespace App\Controller;

use App\Middleware\AuthMiddleware;
use Serapha\Routing\Router;
use Serapha\Routing\Response;
use Serapha\Helper\Str;
use App\Service\UserService;
use App\Helper\UserHelper;

class UserController extends BaseController
{
    private Router $router;
    private Response $response;
    private UserService $userService;

    public function __construct(Router $router, Response $response)
    {
        $this->router = $router;
        $this->response = $response;
        $this->userService = new UserService($this->sanite);
    }

    public function show(string|int $id)
    {
        $user = $this->userService->getUserProfile((int) $id);

        // Use application-level helper function
        $user['email'] = UserHelper::obfuscateEmail($user['email'] ?? 'test_user@example.com');

        $data = [
            'user' => $user,
        ];

        $this->template->render(['header_common.html', 'view_user.html', 'footer_common.html'], $data);
    }

    public function create()
    {
        // Run middleware before processing the request
        $this->router->runMiddleware(new AuthMiddleware())->send();

        $username = 'john_doe';

        if (!UserHelper::isValidUsername($username)) {
            echo 'Invalid username!';
            return;
        }

        $data = [
            'username' => $username,
            'password' => password_hash('secret', PASSWORD_BCRYPT),
            'group_id' => 1,
            'language' => 'en_US',
            'online_status' => 1,
            'last_login' => time(),
            'join_date' => time()
        ];

        // Use framework-level helper function for data setting
        $user['short_username'] = Str::limit($username, 5);

        $this->userService->registerUser($data);

        // Redirect to user list page
        return $this->response->redirect('/users');
    }

    public function update($id)
    {
        $data = [
            'username' => 'john_doe_updated',
            'password' => 'new_secret', // Will be hashed in the service layer
            'group_id' => 2,
            'language' => 'en',
            'online_status' => 1,
            'last_login' => time(),
            'join_date' => time()
        ];

        $this->userService->updateProfile($data, (int) $id);

        // Redirect to user page
        return $this->response->redirect("/user/{$id}");
    }

    public function delete($id)
    {
        $this->userService->deleteUser((int) $id);

        // Redirect to user list page
        return $this->response->redirect('/users');
    }
}
