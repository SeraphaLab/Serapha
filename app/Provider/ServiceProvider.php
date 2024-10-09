<?php
namespace App\Provider;

use Serapha\Provider\Provider;
use Serapha\Utils\Utils;
use carry0987\Sanite\Sanite;
use carry0987\Redis\RedisTool;
use carry0987\Config\Config as GlobalConfig;
use carry0987\SessionManager\SessionManager;

class ServiceProvider extends Provider
{
    public function register(): void
    {
        /** @var Sanite $sanite */
        $sanite = $this->container->get(Sanite::class);
        /** @var RedisTool $redisTool */
        $redisTool = $this->container->get(RedisTool::class);

        // Set the global config
        $this->container->singleton(GlobalConfig::class, function () use ($sanite, $redisTool) {
            $config = new GlobalConfig($sanite->getConnection());
            $config->setTableName('global_config')->setIndexList([
                'web_config' => 1
            ]);
            $config->setRedis($redisTool);

            return $config;
        });

        // Set the session
        $this->container->singleton(SessionManager::class, function () {
            $session = new SessionManager('Session-'.Utils::xxHash(Utils::getBasePath(0)), [
                'path' => Utils::trimPath(Utils::getBasePath().'/'),
                'secure' => Utils::checkHttps(),
                'samesite' => 'Strict'
            ]);

            return $session;
        });
    }

    public function boot(): void
    {
    }
}
