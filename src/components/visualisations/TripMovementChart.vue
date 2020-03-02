<template>
  <div class="deck-container">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
  </div>
</template>

<style scoped>
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
import {TRIPS_VISUALIZATON} from "../../constants/graphql";

export default {
  data() {
    return {
      animationTime: new Date(Date.now()).getSeconds() % 120,
      viewState: {
        latitude: 37.7664413,
        longitude: -122.39079879999997,
        zoom: 14,
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
      },
    };
  },
  created() {
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
    setInterval(this.getNow, 20);
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
      this.animationTime = (new Date(Date.now()) % 1199);
      console.log(this.animationTime);
    }
  },

  computed: {
    getLayer() {
      return new TripsLayer({
        id: "trips-layer",
        data: this.waypoints,
        getPath: d => d.waypoints.map(p => p.coordinates),
        // deduct start timestamp from each data point to avoid overflow
        getTimestamps: d => d.waypoints.map(p => p.timestamp - 1554772579000),
        getColor: [253, 128, 93],
        opacity: 0.8,
        widthMinPixels: 2,
        rounded: true,
        trailLength: 200,
        currentTime: this.animationTime
      });
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
