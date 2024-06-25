<?php
require dirname(__DIR__).'/vendor/autoload.php';

use Serapha\Core\Bootstrap;
use Serapha\Core\Core;
use Serapha\Core\Config;

// Initialize the application core and container
Bootstrap::init(dirname(__DIR__));
$core = new Core();
$container = $core->getContainer();
/** @var Config $config */
$config = $container->get(Config::class);

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'development' => [
            'adapter' => 'mysql',
            'host' => $config->get('DB_HOST', '127.0.0.1'),
            'name' => $config->get('DB_NAME', ''),
            'user' => $config->get('DB_USER', ''),
            'pass' => $config->get('DB_PASSWORD', ''),
            'port' => $config->get('DB_PORT', 3306),
            'charset' => 'utf8mb4',
        ]
    ],
    'version_order' => 'creation'
];
