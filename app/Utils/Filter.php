<?php
namespace App\Utils;

class Filter
{
    /**
     * Truncate a string to a specified length and append ellipsis if necessary.
     *
     * Shortens the string to the specified character limit, appending '...' if truncated.
     *
     * @param string $value The input string to be truncated.
     * @param int $count_limit The maximum length of the truncated string.
     * @return string The truncated string, potentially with appended ellipsis.
     */
    public static function stripValue(string $value, int $count_limit)
    {
        if (mb_strlen($value,'utf-8') > $count_limit) {
            $value = mb_substr($value, 0, $count_limit, 'utf-8');
            $value .= '...';
        } else {
            $value = mb_substr($value, 0, $count_limit, 'utf-8');
        }

        return $value;
    }

    /**
     * Validate and encode a URL to ensure its proper format.
     *
     * Encodes the URL path segments and validates the overall URL structure.
     *
     * @param string $url The URL to validate and encode.
     * @return bool True if the URL is valid, false otherwise.
     */
    public static function validateURL(string $url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        $encoded_path = array_map('urlencode', explode('/', $path));
        $url = str_replace($path, implode('/', $encoded_path), $url);

        return filter_var($url, FILTER_VALIDATE_URL) ? true : false;
    }

    /**
     * Validate the format of an email address using regex.
     *
     * Checks if the provided email address matches standard email format.
     *
     * @param string $email The email address to validate.
     * @return bool True if the email format is valid, false otherwise.
     */
    public static function validateEmail(string $email)
    {
        return preg_match("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$^", $email);
    }
}
