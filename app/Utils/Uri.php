<?php
namespace App\Utils;

use Serapha\Utils\Utils;

class Uri
{
    public static function inRewriteMode(): bool
    {
        return Utils::isRewriteEnabled();
    }

    public static function getBasePath(int $levels = 2): string
    {
        return Utils::getBasePath($levels);
    }

    public static function siteUrl(string $path = '/'): string
    {
        return Utils::generateUrl($path);
    }
}
