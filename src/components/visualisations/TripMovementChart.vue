<template>
  <div class="outer-container">
  <div class="deck-container">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
  </div>
         <span>{{animationTime}}</span>
  </div>
</template>

<style scoped>
  .outer-container {

  width: 100%;
  position: relative;
  }
.deck-container {
  width: 100%;
  height: 600px;
  position: relative;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e5e9ec;
  overflow: hidden;
}
#deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<script>
import { Deck } from "@deck.gl/core";
import { TripsLayer } from "@deck.gl/geo-layers";
import deck from "@deck.gl/core";
import mapboxgl from "mapbox-gl";
import { TRIPS_VISUALIZATON } from "../../constants/graphql";

export default {
  data() {
    return {
      animationTime: new Date(Date.now()).getSeconds() % 120,
      viewState: {
        latitude: 53.571361,
        longitude: 9.952743,
        zoom: 12,
        pitch: 0,
        bearing: 0
      },
      waypoints: [],
      getWaypoints: function() {
        this.$apollo
          .query({
            query: TRIPS_VISUALIZATON
          })
          .then(res => {
            this.waypoints = res.data.tripsVisualization;
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  },
  created() {
    this.getWaypoints();
    this.map = null;
    this.accessToken =
      "pk.eyJ1Ijoibm9jaGZlbGl4IiwiYSI6IldwOGpBcmcifQ.hrc_eJ8JcJ2W6ABTTaBQOw";
    this.deck = null;
  },
  mounted() {
    // creating the map

    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: this.$refs.map,
      interactive: false,
      style: this.mapStyle || "mapbox://styles/mapbox/light-v10",
      center: [this.viewState.longitude, this.viewState.latitude],
      zoom: this.viewState.zoom,
      pitch: this.viewState.pitch,
      bearing: this.viewState.bearing
    });

    // creating the deck.gl instance
    this.deck = new Deck({
      canvas: this.$refs.canvas,
      width: "100%",
      height: "100%",
      initialViewState: this.viewState,
      controller: true,
      // change the map's viewstate whenever the view state of deck.gl changes
      onViewStateChange: ({ viewState }) => {
        this.map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });
      }
    });
    setInterval(this.getNow, 40);
    this.renderLayers([this.getLayer]);
  },
  methods: {
    renderLayers(layers) {
      // setting the layers to deck.gl props
      this.deck.setProps({
        layers
      });
    },
    getNow: function() {
      this.animationTime = new Date(Date.now()) % 47800;
    },
    convertHex: function(color) {
      color = color.replace("#", "");
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      return [r,g,b];
    }
  },

  computed: {
    getLayer() {
      var wp = this.waypoints;
      if (wp && wp.length > 0) {
        return new TripsLayer({
          id: "trips-layer",
          data: wp,
          getPath: d => d.path.map(p => p.l),
          // deduct start timestamp from each data point to avoid overflow
          getTimestamps: d => d.path.map(p => p.t),
          getColor:  d  => this.convertHex(d.color),
          opacity: 0.8,
          widthMinPixels: 4,
          rounded: true,
          trailLength: 200,
          currentTime: this.animationTime
        });
      }
    }
  },

  watch: {
    // whenever the layer data is changed and new layers are created,
    // rerender the layers
    getLayer: function(layer) {
      this.renderLayers([layer]);
    }
  }
};
</script>

<style scoped></style>
