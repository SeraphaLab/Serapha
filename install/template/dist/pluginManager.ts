import { PluginManager } from '@carry0987/plugin-manager';

// Clean and copy the necessary files
PluginManager.cleanDir('node_modules', 'plugins');
PluginManager.copyDistFolders('node_modules', 'plugins');
PluginManager.clearUnnecessaryFiles('plugins/bootstrap', ['**/bootstrap.bundle.min.js', '**/bootstrap.min.css']);
PluginManager.clearUnnecessaryFiles('plugins/jquery', ['**/jquery.min.js']);
PluginManager.clearUnnecessaryFiles('plugins/select2', ['**/select2.min.js', '**/select2.min.css']);
PluginManager.clearUnnecessaryFiles('plugins/sweetalert2', ['**/sweetalert2.min.js', '**/sweetalert2.min.css']);
PluginManager.clearEmptyDirs('plugins');
PluginManager.removeDirs([
    'plugins/object.assign',
    'plugins/@carry0987/plugin-manager',
    'plugins/@carry0987/utils',
    'plugins/@rollup',
    'plugins/rollup',
]);
