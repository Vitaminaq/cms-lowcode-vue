import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';
const Index = () => import("../views/Index.vue");
const LowCode = () => import("../views/LowCode.vue");
const LowCodeGenerate = () => import("../low-code-generate.vue");

const modules = import.meta.globEager('../modules/*/router/*');


export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Index
    }, {
        path: "/low-code",
        name: "LowCode",
        component: LowCode
    }, {
        path: "/low-code-generate",
        name: "LowCodeGenerate",
        component: LowCodeGenerate
    }
];

Object.keys(modules).map(async (path) => {
    const module: any = modules[path]

    routes.push(...module.default);
});

export default createRouter({
    history: createWebHistory(),
    routes
});

