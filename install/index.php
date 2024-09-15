<?php
require dirname(__FILE__).'/include/Core.php';

// Composer
use carry0987\Template as Template;

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

$template = new Template\Template;
$template->setOptions($options);

include($template->loadTemplate('index.html'));
