<?php
require dirname(__DIR__).'/vendor/autoload.php';

use Serapha\Core\Bootstrap;
use Serapha\Core\Core;
use Serapha\Routing\Router;

// Initialize the application core and container
Bootstrap::init(dirname(__DIR__));
$core = new Core();
$container = $core->getContainer();

// Retrieve router from container
$router = $container->get(Router::class);

// Register specific routes for the application
require dirname(__DIR__).'/app/Route/routes.php';

// Run the application
$core->run($_GET['query'] ?? '/');
