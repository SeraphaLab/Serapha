<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Template extends AbstractMigration
{
    public function change(): void
    {
        // Create the table
        $table = $this->table('template', [
            'id' => 'tpl_id',
            'signed' => false,
            'engine' => 'InnoDB',
            'collation' => 'utf8mb4_unicode_ci',
            'comment' => 'Template Table'
        ]);

        // Add columns
        $table->addColumn('tpl_path', 'string', ['limit' => 60, 'null' => false])
            ->addColumn('tpl_name', 'string', ['limit' => 60, 'null' => false])
            ->addColumn('tpl_type', 'string', ['limit' => 4, 'null' => false])
            ->addColumn('tpl_hash', 'string', ['limit' => 80, 'null' => false])
            ->addColumn('tpl_expire_time', 'integer', ['limit' => 10, 'null' => false])
            ->addColumn('tpl_verhash', 'string', ['limit' => 20, 'null' => false])

            // Create the table
            ->create();
    }
}
