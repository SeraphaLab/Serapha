<?php
namespace App\Utils;

class Ini
{
    /**
     * Retrieve the value of a configuration option from the php.ini file.
     *
     * Fetches the current value of a specified php.ini directive.
     * 
     * @param string $ini_key The configuration option key.
     * @return string|false The value of the ini directive, or false if not set.
     */
    public static function getValue(string $ini_key)
    {
        return ini_get($ini_key);
    }

    /**
     * Get the size value of a specified php.ini directive, optionally in bytes.
     *
     * Converts and retrieves the size from a php.ini directive, with an option to return it in bytes.
     *
     * @param string $ini_key The configuration option key for size.
     * @param bool $in_bytes If true, returns size in bytes; otherwise, original format.
     * @return mixed The size value either in bytes or original format.
     */
    public static function getSize(string $ini_key, bool $in_bytes = true)
    {
        $size = self::getValue($ini_key);
        if ($in_bytes === true) {
            $size = File::getByte($size);
        } else {
            $size = File::getByte($size, true);
        }

        return $size;
    }

    /**
     * Check if a command exists in the system's PATH.
     *
     * Verifies the existence of a shell command, optionally returning its exit code.
     *
     * @param string $cmd The command to check.
     * @param bool $get_code If true, returns the exit code; otherwise, returns a boolean.
     * @return bool|int True if command exists, exit code if $get_code is true, or false otherwise.
     */
    public static function commandExist(string $cmd, bool $get_code = false)
    {
        $return_info = null;
        $return_code = 0;
        exec('which '.escapeshellarg($cmd), $return_info, $return_code);

        return ($get_code === false) ? ($return_code !== 127) : $return_code;
    }

    /**
     * Verify if a specific function is enabled in the PHP environment.
     *
     * Checks whether a given function is available and not disabled by the 'disable_functions' directive.
     *
     * @param string $func_name The function name to check.
     * @return bool True if the function is enabled, false if disabled or nonexistent.
     */
    public static function functionEnabled(string $func_name)
    {
        if (!function_exists($func_name)) return false;
        $disabled = explode(',', ini_get('disable_functions'));

        return !in_array($func_name, $disabled);
    }
}
