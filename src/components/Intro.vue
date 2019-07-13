<template>
  <section>
    <LMap
      class="intro"
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
      :options="mapOptions"
    >
      <LTileLayer :url="url"></LTileLayer>
      <LGeoJson v-if="geojson" :geojson="geojson" :options="geojsonOptions"></LGeoJson>
    </LMap>
    <div class="overlay">
      <div class="title">
        <h1>Ein Tag in der Last-Mile-Economy von Hamburg</h1>
      </div>
    </div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";

import LMap from "vue2-leaflet/src/components/LMap";
import LTileLayer from "vue2-leaflet/src/components/LTileLayer";
import LGeoJson from "vue2-leaflet/dist/components/LGeoJson";
import LCircleMarker from "vue2-leaflet/dist/components/LCircleMarker";
import LCircle from "vue2-leaflet/dist/components/LCircle";
import * as L from "leaflet";
import { MAP_OVERVIEW } from "../constants/graphql";
export default {
  name: "Intro",
  components: { LTileLayer, LMap, LGeoJson },
  data: function() {
    return {
      url:
        "https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm9jaGZlbGl4IiwiYSI6IldwOGpBcmcifQ.hrc_eJ8JcJ2W6ABTTaBQOw",
      zoom: 13,
      center: [53.552896, 10.009847],
      bounds: null,
      geojson: false,
      getGeoJson: function() {
        this.$apollo
          .query({
            query: MAP_OVERVIEW
          })
          .then(res => {
            this.geojson = JSON.parse(res.data.latestMap[0].geojson);
          })
          .catch(err => {
            console.log(err);
          });
      },
      geojsonOptions: {
        pointToLayer: function(feature, latlng) {
          return L.circle(latlng, {
            radius: 30,
            weight: 1,
            fillColor: feature.properties.color,
            color: feature.properties.color,
            opacity: 1,
            fillOpacity: 0.8
          });
        }
      },
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: false,
        scrollWheelZoom: false
      }
    };
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getGeoJson();
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.intro {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: -4;
}

.overlay {
  margin: 0 auto;
  padding: 0;
  height: 100vh;
  width: 100%;
  vertical-align: middle;
  margin-top: -100vh;
  position: relative;
  z-index: 200;

  padding-top: 20%;
  padding-left: 15%;
  padding-right: 15%;

  @media (max-width: 576px) {
    padding-top: 40%;
    padding-left: 5%;
    padding-right: 5%;
  }
}
.title {
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0 auto;
}

.title > h1 {
  text-align: center;
  font-family: "Bitter", serif;
  font-size: 3.5rem;
  line-height: 6rem;
  @media (max-width: 576px) {
    font-size: 2rem;
    line-height: 3rem;
  }
}
</style>
