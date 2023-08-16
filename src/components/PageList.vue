<template>
    <ul>
        <li v-for="item in list" :key="item.path">
            <a :href="getPath(item.path)">{{ getPath(item.path) }}</a>
            <PageList
                v-if="item.children"
                :list="item.children"
                :path="item.path"
            />
        </li>
    </ul>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import PageList from './PageList.vue';

const props = defineProps({
    path: {
        type: String,
        default: '',
    },
    list: {
        type: Array as PropType<RouteRecordRaw[]>,
        default: () => [],
    },
});

const getPath = (path: string) => {
    return `${props.path}${props.path ? '/' : ''}${path}`;
};
</script>
