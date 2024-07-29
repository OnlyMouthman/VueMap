<template>
  <div class="scroll-row" v-bind:style="{width: timeLineYear + 'px'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScrollRow",
  props: {
    timeLineYear: {
      type: Number,
    }
  },
};
</script>

<style scoped>
.scroll-row {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
  z-index: 2000;
}
</style>
