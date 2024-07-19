<template>
  <div >
    
    <input v-model.trim="search" placeholder="關鍵字查詢" class="form-control navigation-search" >
    <button class="btn btn-primary bg-mblack navigation-searchBtn" v-on:click="startSearch(search)">
      <i class="fas fa-search"></i>
    </button>
    
    <button class="toggle-btn" v-on:click="toggleSidebar()">☰</button>
    <div class="sidebar" id="sidebar">
      <h2>側邊選單</h2>
      <ul>
          <li><a href="#">首頁</a></li>
          <li><a href="#">關於我們</a></li>
          <li><a href="#">服務</a></li>
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
    </div>

    <div id="map" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script>
import "../stylesSidebar.css";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import * as toolMapSearch from "../javascript/toolMapSearch.js"
import * as sidebar from "../javascript/sidebar.js"
//這行不能刪 會有問題
import L from 'leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      map: null,
      zoom: 8,
      center: [24, 120],
      layerUrl: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      search: "",
      searchList: [],
      tempLayer:null,
    };
  },
  methods: {
    ///初始化地圖
    initMap() {
      var _vue = this;
      _vue.map = L.map('map',{
        minZoom: 3,
        maxZoom: 25,
        zoomControl: false
      }).setView(_vue.center, _vue.zoom);
      _vue.tempLayer = new L.LayerGroup()
      _vue.tempLayer.addTo(_vue.map);
      L.tileLayer(_vue.layerUrl, { }).addTo(_vue.map);
    },
    ///開始搜尋
    async startSearch(){
      var _vue = this;
      //toolMapSearch.Search(_vue.map, _vue.search);
      sidebar.toggleSidebarOpen('sidebarSearch', true);
      _vue.searchList = await toolMapSearch.SearchNominatim(_vue.search)
    },
    ///側滑選單設定
    toggleSidebar(){
      sidebar.toggleSidebar('sidebar');
    },
    SearchListClick(item) {
      var _vue = this;
      toolMapSearch.SearchNominatimClick(_vue.map, _vue.tempLayer, item);
      sidebar.toggleSidebarOpen('sidebarSearch', false);
    }
  },
  mounted() {
    var _vue = this;
    _vue.initMap();
    sidebar.toggleSidebar('sidebarSearch');
    sidebar.toggleSidebar('sidebar');
  }
};
</script>

