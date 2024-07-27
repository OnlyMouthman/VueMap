<template>
    <div>
      <ul>
        <list-item v-for="(item, index) in list" :key="index" :item="item" :level="0" />
      </ul>
    </div>
  </template>
  
  <script>
  import ListItem from '../components/ListItem.vue';
  
  export default {
    name: 'CollapsibleList',
    components: {
      ListItem
    },
    data() {
      return {
        list: [
          {
            text: '中國史',
            children: [
              {
                text: '夏', children: [ ]
              },
              {
                text: '商', children: [ ]
              },
              { 
                text: '周',
                children: [
                  { 
                    text: '西周', children: [] 
                  },
                  { 
                    text: '東周', 
                    children: [
                      { 
                        text: '春秋', children: [],
                      },
                      {
                        text: '戰國', children: [] 
                      },
                    ] 
                  }
                ] 
              },
              {
                text: '秦', children: [ ]
              },
            ]
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  ul {
    list-style-type: none;
    padding-left: 0;
  }
  </style>