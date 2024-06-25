<?php
namespace App\Helper;

class UserHelper
{
    public static function isValidUsername(string $username): bool
    {
        return preg_match('/^[a-zA-Z0-9_]{3,20}$/', $username);
    }

    public static function obfuscateEmail(string $email): string
    {
        list($user, $domain) = explode('@', $email);

        return substr($user, 0, 2) . '****@' . $domain;
    }
}
