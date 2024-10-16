<?php
namespace App\Utils;

use Serapha\Utils\Utils;

class File
{
    private const STORAGE_PATH = 'storage/app/public/';

    /**
     * Convert a size value with a suffix (K, M, or G) to its byte equivalent.
     *
     * Converts size strings with suffixes to bytes, or returns the numeric value.
     * 
     * @param string $value The size string (e.g., '10K', '5M', '2G').
     * @param bool $get_num If true, returns the numeric value without conversion.
     * @return mixed The byte value or the number without conversion.
     */
    public static function getByte(string $value, bool $get_num = false)
    {
        $suffix = substr($value, -1);
        $multiply_by = null;
        if ('K' == $suffix) {
            $multiply_by = 1024;
        } elseif ('M' == $suffix) {
            $multiply_by = 1024*1024;
        } elseif ('G' == $suffix) {
            $multiply_by = 1024*1024*1024;
        }
        if (isset($multiply_by)) {
            $value = substr($value, 0, -1);
            if ($get_num === false) {
                $value *= $multiply_by;
            }
        }

        return $value;
    }

    /**
     * Get the root path with an optional appended subdirectory.
     * 
     * Returns the root path, adding the specified subdirectory if provided.
     *
     * @param string $path Optional subdirectory path to append.
     * @return string The full root path.
     */
    public static function rootPath(string $path = null): string
    {
        $target_path = dirname(__DIR__, 2).'/'.$path;

        return Utils::trimPath($target_path);
    }

    /**
     * Get the storage path with an optional appended subdirectory.
     * 
     * Returns the storage path, optionally prefixed with the root path when specified.
     *
     * @param string $path Optional subdirectory path to append.
     * @param bool $root If true, prefixes the root directory to the path.
     * @return string The full storage path.
     */
    public static function storagePath(string $path = null, bool $root = false): string
    {
        $target_path = self::STORAGE_PATH.$path;

        if ($root === true) {
            $target_path = dirname(__DIR__, 2).'/'.$target_path;
        }

        return Utils::trimPath($target_path);
    }
}
