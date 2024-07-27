<template>
    <li class="list-item-li">
      <div @click="toggle" :style="{ paddingLeft: `${level * 20}px` }" class="list-item">
        <div class="line1" ></div>
        {{ item.text }}
      </div>
      <ul v-if="isOpen && item.children && item.children.length" class="list-item-ul">
        <div class="line" :style="{ marginLeft: `${level * 20 + 15}px` }"></div>
        <list-item v-for="(child, index) in item.children" :key="index" :item="child" :level="level + 1"/>
      </ul>
    </li>
  </template>
  
  <script>
  export default {
    name: 'ListItem',
    props: {
      item: Object,
      level: Number
    },
    data() {
      return {
        isOpen: false
      };
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      }
    }
  };
  </script>
  
  <style scoped>
  .list-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  
  .list-item-li{
    border: none;
    padding: 10px;
  }
  .list-item-ul{
    position: relative; 
    padding: 0px;
  }
  .line{
    width: 2px;
    height: 100%;
    background-color: teal;
    position: absolute;
  }
  .line1{
    width: 10px;
    height: 2px;
    background-color: teal;
    position: absolute;
    margin-left: -15px;
  }
  </style>