<template>
  <div
    class="scroll-title"
    v-bind:style="{
      width: setTitle(timeLineEndYear, timeLineStartYear) + 'px',
    }"
  >
    <div
      class="item"
      v-for="(item, itemIndex) in dataTitle"
      v-bind:style="{
        width: item['width'] + 'px',
        marginLeft: item['marginLeft'] + 'px',
      }"
    >
    <div class="item2">
      {{ item["year"] }}
    </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollTitle",
  props: {
    timeLineStartYear: {
      type: Number,
    },
    timeLineEndYear: {
      type: Number,
    },
  },
  data() {
    return {
      dataTitle: [],
    };
  },
  methods: {
    setTitle(timeLineEndYear, timeLineStartYear) {
      var sum = (timeLineEndYear - timeLineStartYear) / 100;
      sum = sum + 2;
      this.dataTitle = Array.from({ length: sum }, (_, i) => []);
      var width = 0;
      //如果是西元前 開始的，且非整數西元
      if (timeLineStartYear % 100 < 0) {
        width = Math.abs(timeLineStartYear % 100);
        this.dataTitle[0]["width"] = width * 2;
        this.dataTitle[0]["year"] = timeLineStartYear;
        this.dataTitle[0]["marginLeft"] = 0;
        timeLineStartYear = timeLineStartYear - width;
      }
      //如果是西元後 開始的，且非整數西元
      else if (timeLineStartYear % 100 > 0) {
        width = 100 - Math.abs(timeLineStartYear % 100);
        this.dataTitle[0]["width"] = width * 2;
        this.dataTitle[0]["year"] = timeLineStartYear;
        this.dataTitle[0]["marginLeft"] = 0;
        timeLineStartYear = timeLineStartYear + width - 100;
      } else {
        this.dataTitle[0]["width"] = 100 * 2;
        this.dataTitle[0]["year"] = this.setTitleTextFormal(timeLineStartYear + 0 * 100);
        this.dataTitle[0]["marginLeft"] = 0;
      }

      for (var i = 1; i < this.dataTitle.length; i++) {
        this.dataTitle[i]["width"] = 100 * 2;
        this.dataTitle[i]["year"] = this.setTitleTextFormal(timeLineStartYear + i * 100);
        this.dataTitle[i]["marginLeft"] = width + 100 * 2 * i;
      }
      return sum;
    },
    setTitleTextFormal(year){
      if(year % 100 == 0){
        if(year < 0){
          return '西元前' + Math.abs(parseInt(year/100)) + '世紀'
        }else if(year > 0){
          return '西元' + year + '年'
        }
      }
      
      return year
    }
  },
};
</script>

<style scoped>
.item {
  height: 500px;
  width: 200px;
  padding: 0px;
  margin-top:30px ;
  color: #000;
  font-size: 20px;
  flex-shrink: 0;
  user-select: none;
  border-left: 1px solid #0f0f0f;
  position: absolute;
  /* standard syntax */
  -webkit-user-select: none;
  /* for Chrome、Safari */
  -moz-user-select: none;
  /* for Mozilla、Firefox */
}
.item2 {
  height: 500px;
  width: 200px;
  padding: 0px;
  color: #000;
  font-size: 20px;
  flex-shrink: 0;
  user-select: none;
  position: absolute;
  margin-left: -100px;
  margin-top: -30px;
  /* standard syntax */
  -webkit-user-select: none;
  /* for Chrome、Safari */
  -moz-user-select: none;
  /* for Mozilla、Firefox */
}
.scroll-title {
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
  z-index: 1000;
}
</style>
