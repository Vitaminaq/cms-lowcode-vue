<template>
    <div class="mid">
        <template  v-for="(cmp, index) in usedCmps" :key="index" :is="cmp.cmp" v-bind="cmp.props">
            <AppendWraper>
                <component :is="cmp.cmp" v-bind="cmp.props"></component>
            </AppendWraper>
        </template>
    </div>
</template>
<script setup lang="ts">
import AppendWraper from "./AppendWraper.vue";

defineProps({
    usedCmps: {
        type: Object,
        default: () => {}
    }
});
</script>
<style lang="scss" scoped>
.mid {
    flex: 1;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>
