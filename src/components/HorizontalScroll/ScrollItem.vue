<template>
  <div class="item itemtooltip">
    <slot></slot>
    <span class="tooltiptext" v-if="year[3] != '' && year[3] != null">{{ year[3] }}</span>
    <!--<div class="itemcolor1" style="width: 40%;"></div>
    <div class="itemcolor2" style="width: 20%;"></div>
    <div class="itemcolor3" style="width: 40%;"></div>-->
    <div class="itemcolor2" v-bind:style="{width: year[0] * 20 + '%'}"></div>
    <div class="itemcolor1" v-bind:style="{width: year[1] * 20 + '%'}"></div>
    <div class="itemcolor2" v-bind:style="{width: year[2] * 20 + '%'}"></div>
  </div>
</template>

<script>
export default {
  name: 'ScrollItem',
  props: {
    year: {
      type: Array,
      default: [1, 1, 1, ""]
    },
    title: {
      type: String
    }
  },
  data() {
    return {
    }
  }
};
</script>

<style scoped>
.item {
  width: 40px;
  height: 40px;
  padding: 0px;
  background-color: #f0f0f0;
  text-align: center;
  flex-shrink: 0;
  user-select: none;
  
  
  /* standard syntax */
  -webkit-user-select: none;
  /* for Chrome、Safari */
  -moz-user-select: none;
  /* for Mozilla、Firefox */
}
.itemcolor1{
  margin-top: 0%;
  background-color: blue;
  height: 100%;
  display: inline-block;
  
}
.itemcolor2{
  margin-top: 0%;
  background-color:#f0f0f0;
  height: 100%;
  display: inline-block;
}
.itemtooltip .tooltiptext {
  visibility: hidden;
  width: 60px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.itemtooltip:hover .tooltiptext {
  visibility: visible;
}
</style>