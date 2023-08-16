import { build as viteBuild, mergeConfig } from "vite";
import { getInfoByParseArgv, baseConfig } from "./util";
import fse from 'fs-extra/esm'

const main = `
import { createApp } from 'vue'
import App from placeholder

createApp(App).mount('#mountId');
`

export async function build() {
    const { entry, distPath, name, mainFilePath } = getInfoByParseArgv();

    const mountId = name + Date.now();

    fse.outputFileSync(mainFilePath, main.replace("placeholder", `'./${name}.vue'`).replace("mountId", mountId), {
        encoding: "utf8"
    });

    await Promise.all([
        viteBuild(mergeConfig(baseConfig, {
            build: {
                assetsDir: entry,
                emptyOutDir: false,
                minify: 'esbuild',
                sourcemap: false,
                lib: {
                    entry,
                    name,
                    fileName: name
                },
                rollupOptions: {
                    external: ['vue'],
                    output: [
                        {
                            format: "es",
                            dir: distPath
                        },
                    ]
                }
            }
        })),
        viteBuild(mergeConfig(baseConfig, {
            build: {
                assetsDir: mainFilePath,
                emptyOutDir: false,
                minify: 'esbuild',
                sourcemap: false,
                lib: {
                    entry: mainFilePath,
                    name,
                    fileName: name
                },
                rollupOptions: {
                    external: ['vue'],
                    output: [
                        {
                            format: "cjs",
                            dir: distPath
                        }
                    ]
                }
            }
        }))
    ]);

    fse.removeSync(mainFilePath);

    return mountId;
}
