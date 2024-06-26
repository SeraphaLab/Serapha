<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class GlobalConfigSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     */
    public function run(): void
    {
        // Data for global_config table
        $globalConfigData = [
            ['id' => 1, 'param' => 'web_config', 'value' => 'a:5:{s:8:"web_name";s:7:"Serapha";s:15:"web_description";s:20:"Welcome To Serapha !";s:12:"web_language";s:5:"en_US";s:12:"web_timezone";s:3:"UTC";s:11:"maintenance";i:0;}']
        ];

        // Insert data into global_config table
        $table = $this->table('global_config');
        $table->truncate();
        $table->insert($globalConfigData)
            ->saveData();
    }
}
