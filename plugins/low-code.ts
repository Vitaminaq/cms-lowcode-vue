import parse from "co-body";
import fse from 'fs-extra/esm';
import * as prettier from "prettier";
import { resolve } from "../scripts/util";

const template = `
<template>
    <!-- component -->
</template>
<script setup lang="ts">
<!-- script -->
</script>
<style lang="scss">
@import url('@/assets/style/common.css');
<!-- style -->
</style>`;

const filePath = resolve("./src/low-code-generate.vue");

const formatCode = async (code: string) => {
    try {
        return prettier.format(code, {
            parser: "html",
            vueIndentScriptAndStyle: true
        });
    } catch {
        return code;
    }
}

const generateVueFile = async (content: string) => {
    return fse.outputFileSync(filePath, await formatCode(content), {
        encoding: 'utf8',
    });
}

let num = 0;

const lowCodeServer = () => ({
    name: 'low-code-server',
    configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
            if (req.originalUrl.includes("/low-code/create-page")) {
                const body = await parse.json(req);

                if (!body || !Array.isArray(body)) return;

                let component = "";
                let importScript = "";
                let script = "";
                let style = "";
                const usedComponents = [];

                body.forEach(cmp => {
                    const cmpName = `${cmp.name}${num}`;
                    component = component + `<${cmp.name} v-bind="${cmpName}Props" />\n`;
                    if (!usedComponents.includes(cmp.name)) {
                       importScript = importScript + `import ${cmp.name} from "${cmp.path.replace("src", "@")}";\n`;
                       usedComponents.push(cmp.name);
                    }
                    script = script + `const ${cmpName}Props = ${JSON.stringify(cmp.props, null, 4)};\n`;
                    num++;
                });
                const vueFile = template.replace("<!-- component -->", component)
                                        .replace("<!-- script -->", importScript + script)
                                        .replace("<!-- style -->", style);
                
                await generateVueFile(vueFile);

                return res.end("ok");
            }
            next();
        });
    },
});

export default lowCodeServer;
