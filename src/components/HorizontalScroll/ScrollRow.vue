<template>
    <div class="scroll-row">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScrollRow'
  };
  </script>
  
  <style scoped>
  .scroll-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 2px;
  }
  </style>