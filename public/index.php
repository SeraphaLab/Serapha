<?php
require dirname(__DIR__).'/vendor/autoload.php';

use Serapha\Core\Bootstrap;
use Serapha\Core\Core;

// Initialize the application core and container
Bootstrap::init(dirname(__DIR__));
$core = new Core();

// Run the application
$core->run($_SERVER['REQUEST_URI'] ?? '/');
