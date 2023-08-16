<template>
    <div class="right">
        <div>属性</div>
        <div v-for="(value, key) in cmpProps" :key="key">{{ key}}: {{ value }}</div>
    </div>
</template>
<script setup lang="ts">
defineProps({
    cmpProps: {
        type: Object,
        default: () => {}
    }
});
</script>
<style lang="scss" scoped>
.right {
    width: 300px;
    margin-left: 20px;
    background-color: #fff;
    border-radius: 10px;
}
</style>
