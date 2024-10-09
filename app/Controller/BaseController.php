<?php
namespace App\Controller;

use Serapha\Controller\Controller;
use carry0987\Config\Config as GlobalConfig;
use carry0987\SessionManager\SessionManager;
use App\Utils\Uri;

abstract class BaseController extends Controller
{
    protected GlobalConfig $config;
    protected SessionManager $session;

    public function __construct(GlobalConfig $config, SessionManager $session)
    {
        $this->config = $config;
        $this->session = $session;

        $this->template->setOption([
            'template_dir' => dirname(__DIR__, 2).'/resource/view',
            'cache_dir' => '../storage/cache/template',
            'css_dir' => 'asset/css',
            'css_cache_dir' => '../public/cache',
            'js_dir' => 'asset/js',
            'static_dir' => 'asset',
            'auto_update' => true
        ]);

        $this->template->assetPath(function (string $path) {
            return Uri::inRewriteMode() ? '/'.$path : $path;
        });

        // Set the global data for Template
        $this->template->setData([
            'config' => $this->config->getConfig('web_config')
        ]);
    }

    public function json(array|bool|int $data): string
    {
        header('Content-Type: application/json');

        exit(json_encode($data));
    }
}
