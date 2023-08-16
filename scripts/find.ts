import glob from 'fast-glob';
import { workRoot, resolve } from "./util";
import fs from "node:fs/promises";

export const findPage = async () => {
    const files = await glob('src/**/**.html', {
        cwd: workRoot,
        onlyFiles: true,
    });
    return {
        staticPages: files.filter((i) => !/generate/.test(i)),
    };
};

function parseComment(code: string) {
    const regex = /\/\*(.*?)\*\//gs; // 使用正则表达式匹配多行注释
    const matches = code.match(regex); // 执行匹配

    return matches;
}

function parseCommentToObject(comment) {
    const lines = comment.split('\n');
    const parsedObject = {};

    for (const line of lines) {
        const match = line.match(/^\s*\*\s*([\w-]+)\s*(.*?)\s*$/);
        if (match) {
            const key = match[1];
            const value = match[2];
            try {
                console.log(value);
                const value1 = JSON.parse(value);
                parsedObject[key] = value1
            } catch {
                parsedObject[key] = value;
            }
        }
    }

    return parsedObject as any;
}

interface LowCodeCmpItem {
    name: string;
    product: "board" | "pixso";
    path: string;
    props: any;
}

export const findLowCodeComponent = async () => {
    const cmpFiles = await glob('src/**/components/**/*.vue', {
        cwd: workRoot,
        onlyFiles: true,
    });

    const lowCodeCmps: LowCodeCmpItem[] = [];

    for (let len = cmpFiles.length, i = 0; i < len; i++) {
        const cmpFile = cmpFiles[i];
        const content = await fs.readFile(resolve(cmpFile), "utf8");

        if (!content.includes("* low code")) continue;
        const comments = parseComment(content);
        let comment = comments.filter(i => i.includes("* low code"))[0];
        if (!comment) return;
        comment = comment.replace(/\/\*\*/g, "").replace(/\/\*/g, "").replace(/ \*\//g, "").replace(/ \*/g, "").replace("low code", "").trim();
        comment = `globalThis.lowCodeProps = ${comment}`;
        globalThis.eval(comment);

        const pathArray = cmpFile.split('/');
        const fileName = pathArray[pathArray.length - 1];

        const item: LowCodeCmpItem = {
            name: fileName.replace(".vue", ""),
            product: cmpFile.includes("/pixso/") ? "pixso" : "board",
            path: cmpFile,
            props: globalThis.lowCodeProps
        }
        lowCodeCmps.push(item);
        delete globalThis.lowCodeProps;
    }

    return {
        lowCodeCmps
    };
}

const fnName = process.argv[2];

switch(fnName) {
    case "findPage":
        findPage();
        break;
    case "findComponent":
        findLowCodeComponent();
        break;
    default:
        break;
}
