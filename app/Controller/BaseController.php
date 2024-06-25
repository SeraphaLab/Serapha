<?php
namespace App\Controller;

use Serapha\Controller\Controller;

abstract class BaseController extends Controller
{
    public function __construct()
    {
        $this->template->setOption([
            'template_dir' => dirname(__DIR__).'/View',
            'cache_dir' => dirname(__DIR__, 2).'/storage/cache/template',
            'auto_update' => true
        ]);
    }
}
