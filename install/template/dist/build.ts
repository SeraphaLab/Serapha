import { RollupOptions, OutputOptions, watch, rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import path from 'path';
import { deleteAsync } from 'del';

const isProduction: boolean = process.env.BUILD === 'production';
const isWatch: boolean = process.env.BUILD === 'watch';
const globals: Record<string, string> = {
    '@carry0987/utils-full': 'Utils',
    'sweetalert2': 'Swal',
    'select2': 'Select2'
};
let activeWatcher: ReturnType<typeof watch> | null = null;

function getCurrentTimestamp(): string {
    const now: Date = new Date();
    const hours: string = now.getHours().toString().padStart(2, '0');
    const minutes: string = now.getMinutes().toString().padStart(2, '0');
    const seconds: string = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function determineExternal(id: string): boolean {
    const externalLibs: string[] = ['@carry0987/', 'sweetalert', 'select2'];
    const internalLibs: string[] = ['@carry0987/utils'];

    return externalLibs.some(lib => id.startsWith(lib)) && !internalLibs.some(lib => id.endsWith(lib));
}

function getRollupOptions(file: string): RollupOptions {
    return {
        input: path.join('dist', 'ts', file),
        plugins: [
            typescript({ tsconfig: './tsconfig.json' }),
            resolve(),
            isProduction && terser()
        ],
        external: determineExternal
    };
}

function getOutputOptions(file: string): OutputOptions {
    const outputPath: string = path.join('dist', 'js', file.replace(/\.ts$/, '.min.js'));
    return {
        file: outputPath,
        format: 'umd',
        name: 'InstallHelper',
        sourcemap: false,
        globals: globals
    };
}

async function buildFile(file: string, watchMode: boolean = false): Promise<void> {
    console.log(`[${getCurrentTimestamp()}] Building ${file}...`);
    const rollupOptions: RollupOptions = getRollupOptions(file);
    const outputOptions: OutputOptions = getOutputOptions(file);
    if (watchMode) {
        activeWatcher = watch({
            ...rollupOptions,
            output: [outputOptions],
        });
        activeWatcher.on('event', (event) => {
            if (event.code === 'END') {
                console.log(`[${getCurrentTimestamp()}] Rebuilt ${file}`);
            }
        });
    } else {
        const bundle = await rollup(rollupOptions);
        await bundle.write(outputOptions);
        await deleteAsync(['dist/js/interface', 'dist/js/type']);
    }
}

process.on('SIGTERM', () => {
    if (activeWatcher) {
        activeWatcher.close();
    }
});

(async () => {
    await buildFile('install.ts', isWatch);
})();
