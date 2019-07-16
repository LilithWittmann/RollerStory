<template>
  <vue-plotly v-if="data" :data="data" class="chart" :layout="layout" :options="options" />
  <Loading v-else></Loading>
</template>

<script>
import { EXPLORATION_TRIP_TYPE } from "../../constants/graphql";
import VuePlotly from "@statnett/vue-plotly";
import Loading from "../Loading";

export default {
  name: "TripTypeChart",
  props: [
    "dayTimeFrame",
    "timeFrame",
    "tripType",
    "endedAtStation",
    "startedAtStation"
  ],
  components: { Loading, VuePlotly },
  watch: {
    $props: {
      handler() {
        this.data = null;
        this.getStats();
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStats();
  },
  data: function() {
    return {
      data: null,
      layout: {
        barmode: "stack",
        xaxis: {
          ticksuffix: "%"
        },
        legend: {
          x: 1,
          y: 0.0
        }
      },
      options: {
        type: "bar"
      },
      getStats: function() {
        this.$apollo
          .mutate({
            mutation: EXPLORATION_TRIP_TYPE,
            variables: {
              dayTimeFrame: this.dayTimeFrame,
              timeFrame: this.timeFrame,
              tripType: this.tripType,
              endedAtStation: this.endedAtStation,
              startedAtStation: this.startedAtStation
            }
          })
          .then(res => {
            var trip_type_data = {
              x: [],
              y: [],
              type: "bar",
              name: "Fahrten, die nicht an einer ÖPNV Station beginnen/enden",
              orientation: "h",
              marker: {
                color: "rgba(0,0,0,0.6)",
                width: 1
              }
            };
            var trip_type_nearby_station_data = {
              x: [],
              y: [],
              type: "bar",
              name: "Fahrten, die an einer ÖPNV Station beginnen/enden",
              orientation: "h",
              marker: {
                color: "rgba(255,0,0,0.6)",
                width: 1
              }
            };

            var sum = 0;
            for (var tt in res.data.exploreTripTypeStats.result) {
              sum = sum + res.data.exploreTripTypeStats.result[tt].count;
            }

            console.log(res.data);

            sum = sum / 100;

            for (var tt in res.data.exploreTripTypeStats.result) {
              trip_type_data.x.push(
                Math.floor(
                  ((res.data.exploreTripTypeStats.result[tt].count -
                    res.data.exploreTripTypeStats.result[tt]
                      .countNearbyStation) /
                    sum) *
                    100
                ) / 100
              );
              trip_type_data.y.push(
                res.data.exploreTripTypeStats.result[tt].name
              );

              trip_type_nearby_station_data.x.push(
                Math.floor(
                  (res.data.exploreTripTypeStats.result[tt].countNearbyStation /
                    sum) *
                    100
                ) / 100
              );
              trip_type_nearby_station_data.y.push(
                res.data.exploreTripTypeStats.result[tt].name
              );
            }
            console.log(trip_type_data);

            this.data = [trip_type_data, trip_type_nearby_station_data];
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  }
};
</script>

<style scoped></style>
