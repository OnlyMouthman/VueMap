<template>
  <div >
    <l-map ref="map" v-model:zoom="zoom" :center="[24, 120]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
//這行不能刪 會有問題
import L from 'leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 8,
    };
  },
};
</script>

<style></style>