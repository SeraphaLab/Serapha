<?php
namespace Install;

use Phinx\Console\PhinxApplication;
use Phinx\Wrapper\TextWrapper;

class ProcessPhinx {
    private $wrapper;
    private $output = null;

    public function __construct(string $phinxConfig) {
        // Initialize Phinx application and wrapper
        $app = new PhinxApplication();
        $this->wrapper = new TextWrapper($app, ['configuration' => $phinxConfig]);
    }

    public function handleRequest(string $action = 'status'): ProcessPhinx
    {
        switch ($action) {
            case 'migration':
            case 'migrate':
                $this->output = $this->wrapper->getMigrate();
                break;

            case 'rollback':
                $this->output = $this->wrapper->getRollback();
                break;

            case 'seed':
                $this->output = $this->wrapper->getSeed();
                break;

            default:
                $this->output = $this->wrapper->getStatus();
                break;
        }

        return $this;
    }

    public function getOutput(): ?string
    {
        return $this->output;
    }

    public function showOutput()
    {
        if ($this->output === null) {
            throw new \Exception('No output to show');
        }

        // Set header and output the result
        header('Content-Type: text/plain');
        echo $this->output;
    }

    public function parseOutput(): array
    {
        $result = [
            'status' => 'error',
            'time_elapsed' => null,
            'message' => null
        ];

        if (preg_match('/All Done\. Took (\d+\.\d+[smh])/', $this->output, $matches) === 1) {
            $result['status'] = 'success';
            $result['time_elapsed'] = $matches[1];
        }

        if (preg_match_all('/== (.*+)/', $this->output, $matches) > 0) {
            $result['message'] = $matches[1];
        }

        return $result;
    }
}
