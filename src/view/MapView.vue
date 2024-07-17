<template>
  <div >
    <!--<l-map Id="map1" ref="map" v-model:zoom="zoom" :center="[24, 120]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>-->
    <input v-model.trim="search" placeholder="關鍵字查詢" class="form-control navigation-search" >
    <button class="btn btn-primary navigation-searchBtn" v-on:click="startSearch(search)">
      <i class="fas fa-search"></i>
    </button>
    
    <div id="map" style="height: 100%; width: 100%;"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import * as ToolMapSearch from "../javascript/ToolMapSearch.js"
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
      search: ""
    };
  },
  methods: {
    ///初始化地圖
    initMap() {
      var _vue = this;
      _vue.map = L.map('map').setView(_vue.center, _vue.zoom);
      L.tileLayer(_vue.layerUrl, {
          minZoom: 3,
          maxZoom: 25
      }).addTo(_vue.map);
      _vue.startSearch();
    },
    ///開始搜尋
    startSearch(){
      var _vue = this;
      ToolMapSearch.Search(_vue.map, _vue.search)
    }
  },
  mounted() {
    var _vue = this;
    _vue.initMap();
    

  }
};
</script>

