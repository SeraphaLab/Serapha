<?php
namespace App\Service;

use Serapha\Service\Service;
use Serapha\Model\ModelLocator;
use App\Model\UserModel;

class UserService extends Service
{
    private UserModel $userModel;

    public function __construct()
    {
        $this->userModel = ModelLocator::get(UserModel::class);
    }

    public function registerUser(array $data)
    {
        // Perform validation, hashing, etc.
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

        return $this->userModel->createUser($data);
    }

    public function getUserProfile(int $id)
    {
        // Business logic to retrieve user profile
        return $this->userModel->getUserById($id);
    }

    public function updateProfile(array $data, int $id)
    {
        // Additional business logic
        return $this->userModel->updateUser($data, $id);
    }

    public function deleteUser(int $id)
    {
        // Additional business logic
        return $this->userModel->deleteUser($id);
    }
}
