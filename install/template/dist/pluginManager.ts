import { PluginManager } from '@carry0987/plugin-manager';

PluginManager.emptyDir('template/plugins', { verbose: true });
PluginManager.copyPackages('node_modules', 'template/plugins', [
    {
        name: '@carry0987/utils-full',
        include: ['**/utils-full.min.js', '**/utils-full.esm.js']
    },
    {
        name: 'bootstrap',
        include: ['**/bootstrap.min.js', '**/bootstrap.min.css']
    },
    {
        name: 'jquery',
        include: ['**/jquery.min.js']
    },
    {
        name: 'select2',
        include: ['**/select2.min.js', '**/select2.min.css']
    },
    {
        name: 'sweetalert2',
        include: ['**/sweetalert2.min.js', '**/sweetalert2.min.css']
    }
], { verbose: true });
