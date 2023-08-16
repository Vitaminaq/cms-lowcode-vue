import path from 'path';
import { defineConfig } from 'vite';
import jiti from 'jiti';

export const workRoot = process.cwd();

export const resolveModule = (p: string) => jiti(workRoot)(p).default;

export const resolve = (str: string) => path.resolve(workRoot, str);

export const getInfoByParseArgv = () => {
    const entry = process.argv[2];
    if (!entry) {
        console.log('请传入entry, ex: npm run dev ./src/xxxx.vue');
        process.exit(1);
    }

    const entryPath = resolve(entry);
    const devRoot = resolve(path.join(entry, '../'));
    const mainFilePath = resolve(path.join(entry, '../main.ts'));
    const distPath = resolve(path.join(entry, '../build'));
    const styleFilePath = resolve(path.join(entry, '../build/style.css'));
    const generatePath = resolve(path.join(entry, '../generate'));
    const arr = entry.split('/');

    const name = arr[arr.length - 1].replace('.vue', '');

    const compPath = entry.replace(`${name}.vue`, `build/${name}`);
    const jsFilePath = resolve(path.join(entry, `../build/${name}.cjs`));

    const generateJsFilePath = resolve(
        path.join(entry, `../generate/${name}.js`)
    );

    const generateHtmlFilePath = resolve(
        path.join(entry, `../generate/${name}.html`)
    );
    const generateStylePath = resolve(
        path.join(entry, `../generate/${name}.css`)
    );
    const previewFilePath = resolve(
        path.join(entry, `../generate/preview.html`)
    );
    const previewStaticFilePath = resolve(
        path.join(entry, `../generate/preview-static.html`)
    );

    return {
        entry,
        entryPath,
        devRoot,
        mainFilePath,
        distPath,
        styleFilePath,
        name,
        generatePath,
        generateHtmlFilePath,
        generateStylePath,
        previewFilePath,
        jsFilePath,
        generateJsFilePath,
        previewStaticFilePath,
        compPath,
    };
};

export const baseConfig = defineConfig({
    // plugins: [vue()]
});
