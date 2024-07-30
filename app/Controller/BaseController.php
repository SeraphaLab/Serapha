<?php
namespace App\Controller;

use Serapha\Controller\Controller;
use Serapha\Utils\Utils;
use carry0987\Config\Config as GlobalConfig;
use carry0987\Redis\RedisTool;
use carry0987\SessionManager\SessionManager;
use App\Utils\Uri;

abstract class BaseController extends Controller
{
    protected GlobalConfig $config;
    protected SessionManager $session;

    public function __construct(RedisTool $redisTool)
    {
        $this->template->setOption([
            'template_dir' => dirname(__DIR__).'/View',
            'cache_dir' => dirname(__DIR__, 2).'/storage/cache/template',
            'css_dir' => 'asset/css',
            'js_dir' => 'asset/js',
            'static_dir' => 'asset',
            'auto_update' => true
        ]);

        $this->template->assetPath(function (string $path) {
            return Uri::inRewriteMode() ? '/'.$path : $path;
        });

        // Set the global configuration
        $this->config = new GlobalConfig($this->sanite->getConnection());
        $this->config->setTableName('global_config')->setIndexList([
            'web_config' => 1
        ]);
        $this->config->setRedis($redisTool);

        // Set the global data for Template
        $this->template->setData([
            'config' => $this->config->getConfig('web_config')
        ]);

        // Set the session
        $this->session = new SessionManager(Utils::xxHash($_SERVER['PHP_SELF']), [
            'path' => Utils::trimPath(dirname($_SERVER['PHP_SELF'], 2).'/'),
            'secure' => Utils::checkHttps(),
            'samesite' => 'Strict'
        ]);
    }

    public function json(array $data): string
    {
        header('Content-Type: application/json');

        exit(json_encode($data));
    }
}
