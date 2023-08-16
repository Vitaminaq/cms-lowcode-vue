<template>
    <div class="loop-rolling" :class="{ 'loop-rolling-reverse': reverse }">
        <img v-for="(url, index) in list" :key="index" :src="url" />
        <img v-for="(url, index1) in list" :key="index1" :src="url" />
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
/**
 * low code
 * {
 *     list: [
 *         "https://cms.boardmix.cn/images/ai/ai-ppt-demo92.png",
 *         "https://cms.boardmix.cn/images/ai/ai-ppt-demo92.png",
 *         "https://cms.boardmix.cn/images/ai/ai-ppt-demo92.png",
 *         "https://cms.boardmix.cn/images/ai/ai-ppt-demo92.png",
 *         "https://cms.boardmix.cn/images/ai/ai-ppt-demo92.png"
 *     ],
 *     reverse: false
 * }
 */

defineProps({
    list: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    reverse: {
        type: Boolean,
        default: false
    }
});

/**
 * dfdfd
 */
</script>
<style lang="scss">
@keyframes loopRolling {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}
@keyframes loopRollingReserve {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}
.loop-rolling {
    animation: loopRolling 132s linear infinite;
    display: inline-flex;

    &.loop-rolling-reverse {
        animation: loopRollingReserve 222s linear infinite;
    }
}
</style>