<?php
namespace App\Utils;

use Serapha\Utils\Utils;

class Uri
{
    public static function inRewriteMode(): bool
    {
        return Utils::isRewriteEnabled();
    }

    public static function getBasePath(): string
    {
        return dirname($_SERVER['PHP_SELF'], 2);
    }
}
