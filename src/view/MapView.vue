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
        <li><a v-on:click="showPopup = true; toggleSidebar();">歷史</a></li>
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
          <scroll-row v-for="(row, rowIndex) in rows" :key="rowIndex">
            <scroll-item v-for="(item, itemIndex) in row" :key="itemIndex" title="test" :year="item">

            </scroll-item>
          </scroll-row>
        </horizontal-scroll>
      </div>
    </PopupWindow>

    <PopupWindow v-if="showPopupDraw" @close="showPopupDraw = false" popupTitle="繪圖">
      <div class="popupContent">
        <button @click="activateDrawing('point')">點</button>
        <button @click="activateDrawing('line')">線</button>
        <button @click="activateDrawing('polygon')">面</button>
        <ul>
          <li v-for="(item, index) in drawings" :key="index">
            <input type="checkbox" v-model="item.visible" @change="toggleVisibility(item)"> {{ item.type }} {{ index + 1
            }}
          </li>
        </ul>
      </div>
    </PopupWindow>
  </div>
</template>

<script>
import * as testData from "../javascript/testData.js"
import ScrollRow from '../components/HorizontalScroll/ScrollRow.vue';
import HorizontalScroll from '../components/HorizontalScroll/HorizontalScroll.vue';
import ScrollItem from '../components/HorizontalScroll/ScrollItem.vue';
import PopupWindow from '../components/PopupWindow.vue';
import CollapsibleList from '../components/CollapsibleList.vue'
import "../stylesSidebar.css";
import "leaflet/dist/leaflet.css";

import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import * as toolMapSearch from "../javascript/toolMapSearch.js"
import * as sidebar from "../javascript/sidebar.js"
//這行不能刪 會有問題
import L from 'leaflet'
import "https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js";


export default {
  components: {
    LMap,
    LTileLayer,
    CollapsibleList,
    PopupWindow,
    HorizontalScroll,
    ScrollItem,
    ScrollRow
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
      drawings: [],
      drawingType: null,
      drawControl: null,
      rows: testData.getData(),
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

      var toolbar = L.Toolbar();
   toolbar.addToolbar(_vue.map);
    },
    ///開始搜尋
    async startSearch() {
      var _vue = this;
      //toolMapSearch.Search(_vue.map, _vue.search);
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
    activateDrawing(type) {
      this.drawingType = type;
      // 根據選擇的繪圖類型添加對應的繪圖工具
      // 示例: 使用 Leaflet Draw 插件
      
      this.drawControl = new L.Control.Draw({
        draw: {
          marker: type === 'point',
          polyline: type === 'line',
          polygon: type === 'polygon',
          rectangle: false,
          circle: false,
          circlemarker: false
        }
      });
      this.map.addControl(this.drawControl);

      this.map.on(L.Draw.Event.CREATED, (e) => {
        console.log("11")
        const layer = e.layer;
        layer.addTo(this.map);
        this.map.off(L.Draw.Event.CREATED);
        this.drawings.push({
          type: type,
          layer: layer,
          visible: true
        });
        
      });
    },
    toggleVisibility(item) {
      if (item.visible) {
        item.layer.addTo(this.map);
      } else {
        this.map.removeLayer(item.layer);
      }
    }
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
