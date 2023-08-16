<template>
    <div class="index">
        <h1>欢迎来到ssg的世界</h1>
        <h2>请选择你需要前往目标世界的传送门</h2>
        <PageList :list="routes" />

        <ul>
            <li v-for="item in pages" :key="item">
                <a :href="`/${item}`">{{ item }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { routes } from '../router';
import PageList from '../components/PageList.vue';

const pages = staticPages;
</script>
<style>
.index {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
