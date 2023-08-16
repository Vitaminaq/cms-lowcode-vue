<template>
    <div class="left">
        <div>物料库</div>
        <div>自定义组件</div>
        <div v-for="item in lowCodeComponents" :key="item.path" @click="use(item)">
            {{ item.name }}
        </div>
        <div>布局</div>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent, markRaw } from "vue";

export interface UsedCmpItem extends lowCodeCmpItem {
    cmp: any;
}

const lowCodeComponents = lowCodeCmps;

const emits = defineEmits(["use"]);

let id = 0;

const cmpMap = new Map<string, UsedCmpItem>();

const use = async ({ name, path, props, product }: lowCodeCmpItem) => {
    if (cmpMap.has(name)) 
        return emits("use", cmpMap.get(name));
    const cmp = defineAsyncComponent({
        loader: () => {
           return new Promise((resolve) => {
                const callbackName = `${name}_resolve${id++}`;
                (window as any)[callbackName] = resolve;
                const dom = document.createElement("script");
                dom.type = "module";
                dom.innerHTML = `
                import Cmp from "/${path}";
                ${callbackName}(Cmp);
                delete window['${callbackName}'];
                `;
                document.body.appendChild(dom);
            });   
        }
    });
    const cmpItem = {
        props,
        name,
        path,
        product,
        cmp: markRaw(cmp)
    };
    cmpMap.set(name, cmpItem);
    emits("use", cmpItem);
}
</script>
<style lang="scss" scoped>
.left {
    width: 300px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 10px;
}
</style>
