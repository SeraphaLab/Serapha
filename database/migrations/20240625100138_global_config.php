<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class GlobalConfig extends AbstractMigration
{
    public function change()
    {
        // Create global_config table
        $this->table('global_config', [
            'id' => 'id',
            'signed' => false,
            'engine' => 'InnoDB',
            'collation' => 'utf8mb4_unicode_ci',
            'comment' => 'Configuration Table'
        ])
        ->addColumn('param', 'string', ['limit' => 150, 'null' => false])
        ->addColumn('value', 'text', ['null' => true, 'default' => null])
        ->addIndex(['param'], ['unique' => true])
        ->create();
    }
}
