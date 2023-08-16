<template>
    <div class="low-code">
        <LowCodeTop @create="onCreate" @hid-side="onhidSide" />
        <div class="low-code-content">
            <LowCodeLeft v-if="showSide" @use="onUse" />
            <LowCodeMid :usedCmps="usedCmps" />
            <LowCodeRight v-if="showSide" :cmpProps="currentUsedCmps" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import LowCodeTop from './components/LowCodeTop.vue';
import LowCodeLeft, { type UsedCmpItem } from './components/LowCodeLeft.vue';
import LowCodeMid from './components/LowCodeMid.vue';
import LowCodeRight from './components/LowCodeRight.vue';

const usedCmps = ref<UsedCmpItem[]>([]);
const usedCmpSchemaObj = ref<Omit<UsedCmpItem, "cmp">[]>([]);
const currentUsedCmps = ref<UsedCmpItem['props']>();
const showSide = ref(true);

const onUse = async (item: UsedCmpItem) => {
    console.log(item);
    currentUsedCmps.value = item.props;
    usedCmpSchemaObj.value.push({
        name: item.name,
        product: item.product,
        props: item.props,
        path: item.path
    });
    usedCmps.value.push(item);
};

const onhidSide = () => {
    showSide.value = !showSide.value;
}

const onCreate = async () => {
    fetch("/low-code/create-page", {
        method: "POST",
        body: JSON.stringify(usedCmpSchemaObj.value)
    }).then(async (res) => {
        const data = await res.text();
        console.log(data);
    }).catch(() => {
        console.log("生成页面失败，请teams联系飞哥");
    });
}
</script>
<style lang="scss">
@import url('@/assets/style/common.css');
.low-code {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: rgb(246,240,255);

    .low-code-content {
        flex: 1;
        display: flex;
        overflow: hidden;
        padding: 0 20px;
        padding-bottom: 20px;
    }
}
</style>
