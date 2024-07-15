<?php
namespace App\Controller;

use Serapha\Controller\Controller;
use carry0987\Config\Config as GlobalConfig;
use carry0987\Redis\RedisTool;

abstract class BaseController extends Controller
{
    protected GlobalConfig $config;

    public function __construct(RedisTool $redisTool)
    {
        $this->template->setOption([
            'template_dir' => dirname(__DIR__).'/View',
            'cache_dir' => dirname(__DIR__, 2).'/storage/cache/template',
            'static_dir' => '../asset',
            'auto_update' => true
        ]);

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
    }

    public function json(array $data): string
    {
        header('Content-Type: application/json');

        exit(json_encode($data));
    }
}
