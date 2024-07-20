<template>
  <div class="timeLine">
    <ul>
        <TimeLineItem v-for="(item, index) in menuItems" :key="index" :item="item" />
    </ul>
    
  </div>
</template>


<script>
import TimeLineItem from '../components/TimeLineItem.vue';

export default {
  name: 'TimeLine',
  components: {
    TimeLineItem,
  },
  data() {
    return {
      menuItems: [
        {
          level: 0,
          name: 'Item1',
          children: [
            {
              level: 1,
              name: 'Item 2',
              children: [
                {
                  level: 2,
                  name: 'Item 3',
                  children: [
                    {
                      level: 3,
                      name: 'Item 4',
                      children: [
                        {
                          level: 4,
                          name: 'Item 5',
                          children: [
                            {
                              level: 5,
                              name: 'Item 6',
                            }
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 其他項目...
      ],
    };
  },
};
</script>

<style scoped>
.timeLine{
    color: rgb(0, 0, 0);
}
ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin: 5px 0;
  cursor: pointer;
}

</style>