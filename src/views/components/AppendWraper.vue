<template>
<div class="append-wraper">
    <slot></slot>
</div>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
.append-wraper {
    &:hover {
        border: 1px solid red;
    }
}
</style>
