<template>
    <div class="low-code-top">
        <h1>cms 低代码平台</h1>
        <div @click="hidSide">隐藏</div>
        <div @click="create">生成页面</div>
    </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["create", "hidSide"]);

const create = () => {
    emits("create");
}

const hidSide = () => {
    emits("hidSide");
}
</script>
<style lang="scss" scoped>
.low-code-top {
    padding: 16px 0;
    background-color: #fff;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        font-size: 24px;
    }
}
</style>
