<?php
namespace App\Utils;

class Str
{
    /**
     * Convert a string to camel case.
     *
     * @param string $string
     * @return string
     */
    public static function camelCase(string $string): string
    {
        return lcfirst(str_replace(' ', '', ucwords(str_replace(['-', '_'], ' ', $string))));
    }

    /**
     * Convert a string to snake case.
     *
     * @param string $string
     * @return string
     */
    public static function snakeCase(string $string): string
    {
        return strtolower(preg_replace('/([a-z])([A-Z])/', '$1_$2', $string));
    }

    /**
     * Limit the number of characters in a string.
     *
     * @param string $string
     * @param int $limit
     * @param string $end
     * @return string
     */
    public static function limit(string $string, int $limit, string $end = '...'): string
    {
        if (mb_strlen($string) <= $limit) {
            return $string;
        }

        return mb_substr($string, 0, $limit) . $end;
    }

    /**
     * Remove the specified prefix from the start of a string if present.
     *
     * Returns the string without the prefix, or unchanged if the prefix isn't present.
     *
     * @param string $string The original string.
     * @param string $prefix The prefix to remove.
     * @return string The string after removing the prefix.
     */
    public static function removePrefix(string $string, string $prefix): string
    {
        // Check if the string starts with the prefix
        if (strpos($string, $prefix) === 0) {
            // Remove the prefix from the string
            return substr($string, strlen($prefix));
        }

        return $string;
    }

    /**
     * Remove the specified suffix from the end of a string if present.
     *
     * Returns the string without the suffix, or unchanged if the suffix isn't present.
     *
     * @param string $string The original string.
     * @param string $suffix The suffix to remove.
     * @return string The string after removing the suffix.
     */
    public static function removeSuffix(string $string, string $suffix): string
    {
        // Check if the string ends with the suffix
        if (substr($string, -strlen($suffix)) === $suffix) {
            // Remove the suffix from the string
            return substr($string, 0, -strlen($suffix));
        }

        return $string;
    }

    /**
     * Replace placeholders in the format '(:index:)' with specified parameters.
     *
     * Iterates over the parameters to replace each placeholder with its value.
     *
     * @param string $value The input string with placeholders.
     * @param array $param An array of values for replacement.
     * @return string The string with placeholders replaced.
     */
    public static function replaceParam(string $value, array $param)
    {
        foreach ($param as $index => $p) {
            $value = str_replace('(:'.$index.':)', $p, $value);
        }

        return $value;
    }
}
