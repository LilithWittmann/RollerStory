<template>
  <vue-plotly v-if="data" :data="data" :layout="layout" class="chart" :options="options" />
  <Loading v-else></Loading>
</template>

<script>
import { EXPLORATION_WEEKDAY_HOUR } from "../../constants/graphql";
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
      options: {
        type: "heatmap"
      },
      getStats: function() {
        this.$apollo
          .mutate({
            mutation: EXPLORATION_WEEKDAY_HOUR,
            variables: {
              dayTimeFrame: this.dayTimeFrame,
              timeFrame: this.timeFrame,
              tripType: this.tripType,
              endedAtStation: this.endedAtStation,
              startedAtStation: this.startedAtStation
            }
          })
          .then(res => {
            var trip_week_data = {
              x: [
                "Montag",
                "Dienstag",
                "Mittwoch",
                "Donnerstag",
                "Freitag",
                "Samstag",
                "Sonntag"
              ],
              y: [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23
              ],
              z: [],
                type: 'heatmap'
            };

            var d = 0;
            while (d < 24) {
              trip_week_data.z[d] = [];
              var h = 0;
              while (h < 7) {
                trip_week_data.z[d][h] = 0;
                h++;
              }
              d++;
            }

            console.log(trip_week_data);
            var sum = 0;
            for (var ds in res.data.exploreTripsOverWeek.result) {
              trip_week_data.z[
                  res.data.exploreTripsOverWeek.result[ds].hour
              ][res.data.exploreTripsOverWeek.result[ds].weekday] =
                res.data.exploreTripsOverWeek.result[ds].count;
            }

            console.log(trip_week_data);

            this.data = [trip_week_data];
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
