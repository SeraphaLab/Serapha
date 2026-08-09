<?php
namespace Install;

use Install\Installer;

class API
{
    private static array $system;
    private static array $config;
    private static array $param = array();

    /** @var array<string, array> */
    private static array $request = array(
        self::REQUEST_GET => array(),
        self::REQUEST_POST => array()
    );

    const REQUEST_GET = 'GET';
    const REQUEST_POST = 'POST';

    public function __construct()
    {
    }

    public static function setSystem(array $value)
    {
        self::$system = $value;
    }

    public static function getSystem(?string $key = null)
    {
        return $key ? self::$system[$key] : self::$system;
    }

    public static function setParam(string $key, mixed $value)
    {
        self::$param[$key] = $value;
    }

    public static function getParam(?string $key = null)
    {
        return $key ? self::$param[$key] : self::$param;
    }

    public static function setRequest(array $post, array $get)
    {
        self::$request[self::REQUEST_GET] = $get;
        self::$request[self::REQUEST_POST] = $post;
    }

    public static function fetchResult(string $method)
    {
        if ($method === self::REQUEST_POST) {
            $data = self::$request[self::REQUEST_POST];
            // Get POST data
            if (!isset($data['request'])) return false;
            switch ($data['request']) {
                case 'get_language':
                    return array('lang' => self::$param['lang']->getLangs());
                case 'get_language_list':
                    return self::$system['lang_list'];
                case 'set_language':
                    return self::$param['lang']->setLanguage($data['lang'], self::$system['https']);
                case 'check_installed':
                    $config = array(
                        'root_path' => self::$param['root_path']
                    );
                    $installer = new Installer(self::$param['lang'], null, $config);
                    return $installer->checkInstalled();
                case 'start_install':
                    $config = array(
                        'root_path' => self::$param['root_path'],
                        'check_write_permission' => self::$param['check_write_permission']
                    );
                    $installer = new Installer(self::$param['lang'], $data, $config);
                    try {
                        $installer->startInstall();
                        return array('status' => true);
                    } catch (\Exception $e) {
                        return array('status' => false, 'message' => $e->getMessage());
                    }
            }
        }
    }

    public static function setConfig(array $value)
    {
        self::$config = $value;
    }

    public static function getConfig(?string $key = null)
    {
        if (empty($key)) return self::$config;

        return (isset(self::$config[$key])) ? self::$config[$key] : null;
    }
}
