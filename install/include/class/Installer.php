<?php
namespace Install;

use Serapha\Core\Bootstrap;
use Install\Language;
use Install\ProcessPhinx;
use carry0987\Sanite\Sanite;
use PDO;

class Installer
{
    protected Sanite $sanite;
    protected $lang;
    protected $data;
    protected $config;
    protected $webLang;
    protected $adminUsername;
    protected $adminPassword;
    protected $adminPswConfirm;
    protected static $userQuery = 'INSERT INTO user (username, password, group_id, language, last_login, join_date) VALUES (:username, :password, :group_id, :language, :last_login, :join_date)';

    const DIR_SEP = DIRECTORY_SEPARATOR;
    const CONFIG_ROOT = __DIR__.'/../../';

    public function __construct(Language $lang, ?array $data, array $config = [])
    {
        Bootstrap::init(dirname(__DIR__, 3));

        $this->lang = $lang;
        $this->data = $data;
        $this->config = array_merge($this->getDefaultConfigValue(), $config);

        if (is_array($data)) {
            $this->sanite = new Sanite([
                'host' => $_ENV['DB_HOST'],
                'port' => $_ENV['DB_PORT'],
                'database' => $_ENV['DB_NAME'],
                'username' => $_ENV['DB_USER'],
                'password' => $_ENV['DB_PASSWORD']
            ]);
            $this->webLang = $this->getInput('lang', 'en_US');
            $this->adminUsername = $this->getInput('admin_username');
            $this->adminPassword = $this->getInput('admin_password');
            $this->adminPswConfirm = $this->getInput('admin_psw_confirm');
        }
    }

    public function setUserQuery(string $query)
    {
        self::$userQuery = $query;
    }

    public function startInstall()
    {
        if ($this->validatePassword() !== true) {
            throw new \Exception($this->validatePassword());
        }
        if ($this->validateRequiredFields() !== true) {
            throw new \Exception($this->validateRequiredFields());
        }
        if ($this->checkInstallStatus() === true) {
            throw new \Exception($this->lang->getLang('install.installed'));
        }
        if ($this->checkPermission() !== true) {
            throw new \Exception($this->checkPermission());
        }
        $conn = $this->sanite->getConnection();
        if (is_string($conn)) {
            throw new \Exception($conn);
        }
        $startMigration = $this->startProcessPhinx();
        if ($startMigration !== true) {
            throw new \Exception($startMigration);
        }
        $createAdmin = $this->startCreateAdmin($conn);
        if ($createAdmin !== true) {
            throw new \Exception($createAdmin);
        }

        // Generate lock file
        $this->generateLockFile();

        return true;
    }

    public function checkInstalled()
    {
        return $this->checkInstallStatus();
    }

    public static function inputFilter(string $value)
    {
        $value = str_replace("'", "\"", "$value");
        $value = trim($value);
        $value = stripslashes($value);
        $value = htmlspecialchars($value);

        return $value;
    }

    public static function trimPath(string $path)
    {
        return str_replace(array('/', '\\', '//', '\\\\'), self::DIR_SEP, $path);
    }

    public static function showMsg(string $error_type, string $error_msg)
    {
        $error_info = '<h1>'.$error_type.'</h1>'."\n";
        $error_info .= '<h2>'.$error_msg.'</h2>'."\n";

        return $error_info;
    }

    public static function generateFile(string $file, $content)
    {
        $file = self::trimPath($file);
        try {
            if (file_exists($file) === true) {
                unlink($file);
            }
            file_put_contents($file, $content);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        return true;
    }

    public static function showErrorMsg($e)
    {
        $msg = '<h1>Service unavailable</h1>'."\n";
        $msg .= '<br/>';
        $msg .= '<h2>Error Info :'.$e->getMessage().'</h2>';
        $msg .= '<h3>Error Code :'.$e->getCode().'</h3>'."\n";
        $msg .= '<h3>Error File :'.$e->getFile().'</h3>'."\n";
        $msg .= '<h3>Error Line :'.$e->getLine().'</h3>'."\n";

        throw new \Exception($msg);
    }

    protected function getDefaultConfigValue()
    {
        return [
            'lock_file' => 'installed.lock',
            'root_path' => __DIR__ . '/../../',
            'check_write_permission' => ['storage']
        ];
    }

    protected function checkInstallStatus()
    {
        $lock_file = $this->config['root_path'].'/install/cache/'.$this->config['lock_file'];
        if (file_exists($lock_file)) {
            return true;
        }

        return false;
    }

    protected function checkPermission()
    {
        $checkPermission = self::trimPath($this->config['root_path'].'/');
        $folders = $this->config['check_write_permission'];

        foreach ($folders as $folder) {
            if (!is_writeable($checkPermission.$folder)) {
                return self::showMsg('', $this->lang->getLang('install.permission_denied').'\''.$folder.'\'');
            }
        }

        return true;
    }

    protected function getInput(string $field, string $default = '')
    {
        if (isset($this->data[$field])) {
            return self::inputFilter($this->data[$field]);
        }
        if ($default !== '') {
            return $default;
        }

        throw new \Exception($this->lang->getLang('install.input_empty'));
    }

    protected function validatePassword()
    {
        if ($this->adminPassword !== $this->adminPswConfirm) {
            return $this->lang->getLang('install.repassword_error');
        }

        return true;
    }

    protected function validateRequiredFields()
    {
        // Check required fields
        $requiredFields = [
            'username' => $this->adminUsername,
            'password' => $this->adminPassword,
            'password_confirm' => $this->adminPswConfirm,
            'lang' => $this->webLang
        ];

        foreach ($requiredFields as $fieldName => $value) {
            if ($value === '') {
                if ($fieldName === 'password_confirm') {
                    $fieldName = 'password';
                }
                return $this->lang->getLang('install.'.$fieldName.'_empty');
            }
        }

        return true;
    }

    protected function startProcessPhinx()
    {
        $phinx = new ProcessPhinx(dirname(__DIR__, 3).'/database/phinx.php');

        $migrate = $phinx->handleRequest('migration')->parseOutput();
        if ($migrate === null) {
            return false;
        }

        $seed = $phinx->handleRequest('seed')->parseOutput();
        if ($seed === null) {
            return false;
        }

        return true;
    }

    protected function startCreateAdmin(PDO $conn)
    {
        // Put your query here

        return true;
    }

    protected function generateLockFile()
    {
        $lockFileResult = self::generateFile($this->config['root_path'] . '/install/cache/' . $this->config['lock_file'], '');
        if ($lockFileResult !== true) {
            throw new \Exception("Failed to create the lock file: {$lockFileResult}");
        }
    }
}
