<?php
require dirname(__FILE__).'/include/Core.php';

// Composer
use Install\API;
use carry0987\RESTful\RESTful;

// API
$api = new API;
$api::setSystem($SYSTEM);
$api::setParam('lang', $language);
$result = false;

// Check request method
if ($method = RESTful::verifyHttpMethod(true)) {
    $api::setRequest($_POST, $_GET);
    if (isset($_POST, $_POST['request'])) {
        switch ($_POST['request']) {
            case 'check_installed':
            case 'start_install':
                $api::setParam('root_path', dirname(__DIR__).'/');
                $api::setParam('check_write_permission', array('storage'));
                break;
        }
    }
    $result = $api::fetchResult($method);
}

exit(json_encode($result));
