<template>
    <li>
        <span :style="{ display: 'inline-block', textIndent: (item.level * 50) + 'px' }" @click="toggle">{{ item.name }}</span>
        <ul v-if="isOpen">
            <TimeLineItem v-for="(child, index) in item.children" :key="index" :item="child" />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'TimeLineItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
        },
        setIndent(level, name){
            /*var str = "";
            for(var i = 0 ; i < level; i++){
                str = str + "|一";
            }
            return str + name;*/
        }
    },
    mounted() {
    }
};
</script>

<style scoped>

ul {
  padding-left: 20px;
}
</style>