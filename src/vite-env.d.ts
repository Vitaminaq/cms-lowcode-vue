/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare const staticPages: string[];

declare interface lowCodeCmpItem {
    name: string;
    product: "board" | "pixso";
    path: string;
    props: any;
}

declare const lowCodeCmps: lowCodeCmpItem[];

/**
 * 低代码schema
 */
declare interface LowCodeSchemaItem {
    path: string;
    name: string;
    style?: string;
    props: any[];
    // 未来拓展字段
    slot: boolean;
    children: LowCodeSchemaItem[];
}
