<?php
namespace Install;

use carry0987\I18n\I18n;

class Language
{
    private $path = '/';
    private static $lang;

    public function __construct(array $config)
    {
        if (isset($config['cookiePath'])) {
            $this->path = $config['cookiePath'].'/';
        }
        $config['useAutoDetect'] = true;
        $config['defaultLang'] = 'en_US';
        $config['cookie'] = array(
            'name' => 'language',
            'expire' => time()+300,
            'path' => $this->path,
            'domain' => '',
            'secure' => $config['HTTPS'],
            'httponly' => true
        );
        self::$lang = new I18n($config);
    }

    private function setCookie($lang, $security)
    {
        $domain = (string) null;

        return setcookie('language', $lang, time()+300, $this->path, $domain, $security, true);
    }

    public static function setLangList(array $lang_list)
    {
        self::$lang->setLangAlias($lang_list);
    }

    public static function getLangList()
    {
        return self::$lang->fetchLangList();
    }

    public function getLinks($params = array())
    {
        $query_url = '';
        if (!empty($params) === true) {
            unset($params['lang']);
            $query_url = '?'.http_build_query($params);
        }

        return $query_url;
    }

    public function loadLanguage(string $language)
    {
        $language = self::formatAcceptLanguage($language);

        return $language;
    }

    public static function formatAcceptLanguage(string $acceptLanguage)
    {
        if (preg_match('/^[a-z]{2}_[A-Z]{2}$/', $acceptLanguage)) {
            return $acceptLanguage;
        }
        $langs = explode(',', $acceptLanguage);
        $primaryLang = explode(';', $langs[0])[0];
        $parts = explode('-', $primaryLang);
        if (count($parts) === 2) {
            return strtolower($parts[0]) . '_' . strtoupper($parts[1]);
        }

        return '';
    }

    public function getLang(string $key)
    {
        return self::$lang->fetch($key);
    }

    public function getLangs()
    {
        return self::$lang->fetchList();
    }

    public function getCurrentLang()
    {
        return self::$lang->fetchCurrentLang();
    }

    public function setLanguage($get_lang, $get_security)
    {
        foreach (self::$lang->getLangAlias() as $key => $value) {
            if ($get_lang === $key) {
                return $this->setCookie($key, $get_security);
            }
        }

        return $this->setCookie('en_US', $get_security);
    }
}
