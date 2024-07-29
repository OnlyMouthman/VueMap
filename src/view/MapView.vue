<template>
  <div>

    <input v-model.trim="search" placeholder="關鍵字查詢" class="form-control navigation-search">
    <button class="btn btn-primary bg-mblack navigation-searchBtn" v-on:click="startSearch(search)">
      <i class="fas fa-search"></i>
    </button>

    <button class="toggle-btn" v-on:click="toggleSidebar();">☰</button>
    <div class="sidebar" id="sidebar">
      <h2>側邊選單</h2>
      <ul>
        <li><a v-on:click="showPopupDraw = true; toggleSidebar();">繪圖</a></li>
        <li><a href="#">關於我們</a></li>
        <li><a v-on:click="showPopupHistory = true; toggleSidebar(); getHistoryData();">歷史</a></li>
        <li><a href="#">聯絡我們</a></li>
        <li><a href="#">常見問題</a></li>
      </ul>
    </div>

    <div class="sidebarSearch" id="sidebarSearch">
      <ul>
        <li v-for="(item, index) in searchList" :key="index" @click="SearchListClick(item)">
          {{ item["Describe"] }}
        </li>
      </ul>
      <!--<CollapsibleList></CollapsibleList>-->
    </div>

    <div id="map" style="height: 100%; width: 100%;"></div>

    <PopupWindow v-if="showPopupHistory" @close="showPopupHistory = false" popupTitle="歷史">
      <div class="popupContent">
        <horizontal-scroll>
          <scroll-title :timeLineStartYear="timeLineStartYear" :timeLineEndYear="timeLineEndYear">
            
          </scroll-title>
          <scroll-row v-for="(row, rowIndex) in rows" :index="rowIndex" :timeLineYear="timeLineEndYear - timeLineStartYear">
            <scroll-item v-for="(item, itemIndex) in row" :index="itemIndex" :itemWidth="item['yearWidth']" :itemMarginLeft="item['yearMarginLeft']" :year="item">

            </scroll-item>
          </scroll-row>
        </horizontal-scroll>
      </div>
    </PopupWindow>

    <PopupWindow v-if="showPopupDraw" @close="showPopupDraw = false" popupTitle="繪圖">
      <div class="popupContent">
        
      </div>
    </PopupWindow>
  </div>
</template>

<script>
import * as testData from "../javascript/testData.js"
import * as timeLine from "../javascript/timeLine.js"

import ScrollRow from '../components/HorizontalScroll/ScrollRow.vue';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll.vue';
import ScrollItem from '../components/HorizontalScroll/ScrollItem.vue';
import ScrollTitle from '../components/HorizontalScroll/ScrollTitle.vue';
import PopupWindow from '../components/PopupWindow.vue';
import CollapsibleList from '../components/CollapsibleList.vue'
import "../stylesSidebar.css";
import "leaflet/dist/leaflet.css";
import * as mapAPI from "../javascript/mapAPI.js"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import * as toolMapSearch from "../javascript/toolMapSearch.js"
import * as sidebar from "../javascript/sidebar.js"
//這行不能刪 會有問題
import L from 'leaflet'



export default {
  components: {
    LMap,
    LTileLayer,
    CollapsibleList,
    PopupWindow,
    HorizontalScroll,
    ScrollItem,
    ScrollRow,
    ScrollTitle,
  },
  data() {
    return {
      map: null,
      zoom: 8,
      center: [24, 120],
      layerUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      search: "",
      searchList: [],
      tempLayer: null,
      showPopupHistory: false,
      //draw
      showPopupDraw: false,

      rows: null,
      timeLineStartYear: 0,
      timeLineEndYear:0,
    };
  },
  methods: {
    ///初始化地圖
    initMap() {
      var _vue = this;
      _vue.map = L.map('map', {
        minZoom: 3,
        maxZoom: 25,
        zoomControl: false
      }).setView(_vue.center, _vue.zoom);
      _vue.tempLayer = new L.LayerGroup()
      _vue.tempLayer.addTo(_vue.map);
      L.tileLayer(_vue.layerUrl, {}).addTo(_vue.map);

    },
    ///開始搜尋
    async startSearch() {
      var _vue = this;
      toolMapSearch.Search(_vue.map, _vue.search);
      sidebar.toggleSidebarOpen('sidebarSearch', true);
      _vue.searchList = await toolMapSearch.SearchNominatim(_vue.search)
    },
    ///側滑選單設定
    toggleSidebar() {
      sidebar.toggleSidebar('sidebar');
    },
    SearchListClick(item) {
      var _vue = this;
      toolMapSearch.SearchNominatimClick(_vue.map, _vue.tempLayer, item);
      sidebar.toggleSidebarOpen('sidebarSearch', false);
    },
    async getHistoryData(){
      var data = await mapAPI.getHistoryData()
      console.log(data)
      var startYear;
      var endYear;
      timeLine.initData();
      timeLine.sortData(data.data);

      this.timeLineStartYear = timeLine.getStarYear()
      this.timeLineEndYear = timeLine.getEndYear()
      var array = timeLine.getTimeLineArray();
      this.timeLineItemPostition = Array.from({ length: array.length }, (_, i) => this.timeLineStartYear )
      console.log(array);
      this.rows = array
    },
    
  },
  mounted() {
    var _vue = this;
    _vue.initMap();
    sidebar.toggleSidebar('sidebarSearch');
    sidebar.toggleSidebar('sidebar');
  },
  watch: {
    showPopup: function () {
      var _vue = this;
      if (_vue.showPopup) {

      }
    }
  }
};
</script>
