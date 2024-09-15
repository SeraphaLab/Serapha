<?php
// Check autoload
if (file_exists(dirname(__DIR__).'/../vendor/autoload.php') === false) {
    echo '<h1>Could not find the autoload file !</h1>',"\n";
    echo '<h2>Please run "composer install" command in the root directory</h2>',"\n";
    exit();
}

require dirname(__DIR__).'/../vendor/autoload.php';

// Composer
use Install\Language;

// Set system variable
$SYSTEM = array();

// Set path
define('ROOT_PATH', dirname(__DIR__).'/');

// Check HTTPS
$SYSTEM['https'] = false;
if (isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) === 'on') {
    $SYSTEM['https'] = true;
}

// Set language
$language = new Language(array(
    'HTTPS' => $SYSTEM['https'],
    'langFilePath' => ROOT_PATH.'language',
    'cachePath' => 'cache/lang',
));
$language::setLangList(array('en_US' => 'English', 'zh_TW' => '繁體中文'));
$SYSTEM['lang_list'] = $language::getLangList();
$SYSTEM['system_lang'] = $language->getCurrentLang();
$LANG = $language->getLangs();
