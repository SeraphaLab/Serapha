<?php
require dirname(__FILE__).'/include/Core.php';

// Composer
use Serapha\Core\Bootstrap;
use carry0987\Template as Template;
use carry0987\Template\Controller\DBController;

// Initialize the application core and container
Bootstrap::init(dirname(__DIR__));

// Template setting
$options = [
    'template_dir' => 'template/',
    'css_dir' => 'template/dist/css/',
    'js_dir' => 'template/dist/js/',
    'static_dir' => 'template/icon/',
    'cache_dir' => 'cache/',
    'auto_update' => true,
    'cache_lifetime' => 0
];

$database = new DBController([
    'host' => $_ENV['DB_HOST'],
    'port' => $_ENV['DB_PORT'],
    'database' => $_ENV['DB_NAME'],
    'username' => $_ENV['DB_USER'],
    'password' => $_ENV['DB_PASSWORD']
]);

$template = new Template\Template;
$template->setOptions($options)->setDatabase($database);

include($template->loadTemplate('index.html'));
