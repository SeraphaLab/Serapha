import { InputOptions, OutputOptions, RolldownWatcherEvent, watch, rolldown } from 'rolldown';
import path from 'path';
import { deleteAsync } from 'del';

const isProduction: boolean = process.env.BUILD === 'production';
const isWatch: boolean = process.env.BUILD === 'watch';
const globals: Record<string, string> = {
    '@carry0987/utils-full': 'Utils',
    'jquery': 'jQuery',
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
    const externalLibs: string[] = ['@carry0987/', 'jquery', 'sweetalert', 'select2'];
    const internalLibs: string[] = ['@carry0987/utils'];

    return externalLibs.some(lib => id.startsWith(lib)) && !internalLibs.some(lib => id.endsWith(lib));
}

function getRolldownOptions(file: string): InputOptions {
    return {
        input: path.join('template', 'dist', 'ts', file),
        tsconfig: './tsconfig.json',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
        },
        external: determineExternal
    };
}

function getOutputOptions(file: string): OutputOptions {
    const outputPath: string = path.join('template', 'dist', 'js', file.replace(/\.ts$/, '.min.js'));
    return {
        file: outputPath,
        format: 'umd',
        name: 'InstallHelper',
        minify: isProduction,
        sourcemap: false,
        globals: globals
    };
}

async function buildFile(file: string, watchMode: boolean = false): Promise<void> {
    console.log(`[${getCurrentTimestamp()}] Building ${file}...`);
    const rolldownOptions: InputOptions = getRolldownOptions(file);
    const outputOptions: OutputOptions = getOutputOptions(file);
    if (watchMode) {
        activeWatcher = watch({
            ...rolldownOptions,
            output: [outputOptions],
        });
        activeWatcher.on('event', (event: RolldownWatcherEvent) => {
            if (event.code === 'END') {
                console.log(`[${getCurrentTimestamp()}] Rebuilt ${file}`);
            }
        });
    } else {
        const bundle = await rolldown(rolldownOptions);
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
