<?php
namespace App\Utils;

use Serapha\Utils\Utils;

class Uri
{
    /**
     * Check if the server is operating in URL rewrite mode.
     *
     * Determines if URL rewriting is enabled on the server.
     * 
     * @return bool True if rewrite mode is enabled, false otherwise.
     */
    public static function inRewriteMode(): bool
    {
        return Utils::isRewriteEnabled();
    }

    /**
     * Get the base path of the application relative to the specified directory levels.
     * 
     * Retrieves the base path, moving up the specified number of directory levels.
     *
     * @param int $levels The number of directory levels to traverse upwards.
     * @return string The calculated base path.
     */
    public static function getBasePath(int $levels = 2): string
    {
        return Utils::getBasePath($levels);
    }

    /**
     * Generate a fully qualified URL for a given path on the site.
     *
     * Constructs a full URL using the specified path, based on the site's base settings.
     *
     * @param string $path The path to append to the base URL.
     * @return string The fully constructed site URL.
     */
    public static function siteUrl(string $path = '/'): string
    {
        return Utils::generateUrl($path);
    }
}
