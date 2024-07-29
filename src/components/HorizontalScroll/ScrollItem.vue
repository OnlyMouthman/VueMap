<template>
  <div class="item" v-bind:style="{width: itemWidth + 'px', marginLeft: itemMarginLeft + 'px', backgroundColor: color[index%6]}" >
    {{year["Chinese"]}}
    <slot></slot>
    <!--<div class="itemcolor1" style="width: 40%;"></div>
    <div class="itemcolor2" style="width: 20%;"></div>
    <div class="itemcolor3" style="width: 40%;"></div>-->
  </div>
</template>

<script>
export default {
  name: 'ScrollItem',
  props: {
    year: {
      type: Object
    },
    itemWidth: {
      type: Number,
    },
    itemMarginLeft:{
      type: Number,
    },
    index:{
      type: Number,
    }
  },
  data() {
    return {
      color:["#e21c6f", "#fe465e", "#f87a50", "#fea64e", "#f9ce53", "#aaca43", "#60bc5f", "#53d4e1", "#3999d1", "#8473d2"]
    }
  }
};
</script>

<style scoped>
.item {
  width: 0px;
  height: 60px;
  padding: 0px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  flex-shrink: 0;
  user-select: none;
  border-radius: 25px;
  /* standard syntax */
  -webkit-user-select: none;
  /* for Chrome、Safari */
  -moz-user-select: none;
  /* for Mozilla、Firefox */
}

</style>