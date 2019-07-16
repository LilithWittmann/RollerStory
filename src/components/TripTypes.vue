<template>

    <section class="top-numbers page">
    <b-container>
      <b-row>
        <col>
        <h2>Wie werden die Roller benutzt?</h2>
        </col>
      </b-row>
        <b-row>
         <div class="col-sm-12 col-md-12 col-lg-6 story scrollama-steps" >
             <p>Heute wird häufig davon gesprochen, dass die eScooter vor allem von Touristen und als alternative zum Fahrrad auf relativ kurzen Strecken genutzt werden.
                 Wir wollten herausfinden, ob wir diese Patterns so in den Daten wiederfinden und wollen in der Zukunft insbesondere beobachten, wie sich diese Daten mit dem Abklingen des Hype-Faktors um die eScooter verändern.
             </p>
             <p>
                 Um das Nutzungsverhalten zu analysieren, haben wir versucht, die E-Scooter-Fahrten in folgende Kategorien einzuteilen:
             </p>
                 <ul>
                    <li><b>Short-Trip</b> eine relativ kurze Fahrt, bei der es vermutlich darum geht an einen bestimmten Ort zur fahren.</li>
                    <li><b>Long-Trip</b> eine längere fahrt (>25 Minuten und >3km), bei der es vermutlich darum geht an einen bestimmten Ort zur fahren.</li>

                     <li><b>Fun-Trip</b> eine Fahrt in der für die Verleihdauer eine unrealistisch kurze Wegstrecke zurücklegt wurde
                        und dabei einen Akkuverbrauch für eine deutlicih längere Strecke aufweist.</li>
                     <li><b>Unknown-Trip</b> eine Fahrt die wir nicht verstehen</li>

                </ul>
                <p>
                    Die Muster von Kurzstrecken und Spaßfahrten konnten wir dabei sehr gut nachvollzien, jedoch gibt es in den Daten noch immer ein beträchtlichen Anteil an Fahrten, die wir nicht verstehen.
                    Bei diesen nicht klassifizierbaren Fahrten handelt es sich häufig um solche, bei denen in sehr langer Zeit eine relativ kurze Strecke zurückgelegt wird.
                    Gründe mit denen wir uns das bisher versucht haben zu erklären sind einerseits Menschen,
                    die zum ersten mal eScooter fahren und deshalb relativ lange und langsam fahren und andererseits das diese Fahrten zumindest zum Teil durch Fehler, die wir bei der Erfassung der Daten machen, entstehen.
                </p>
             <p>
                 Gerade in Deutschland wird das durch das vergleichsweise gut ausgebaute ÖPNV-Netz spannend, da der eScooter afugrund seiner Geschwindigkeit häufig nur auf der ersten/letzten Meile und im Nahbereich einen Zeitvorteil bietet.

             </p>
         </div>
         <div class="col-sm-12 col-md-12 col-lg-6 story scrollama-steps" >
            <TripTypeChart :day-time-frame="'ALL_DAY'" :time-frame="'TODAY'" :trip-type="'ALL'"></TripTypeChart>
         </div>
        </b-row>
    </b-container>
  </section>
</template>

<script>
import { TRIP_TYPE_STATS } from "../constants/graphql";
import TripTypeChart from "./visualisations/TripTypeChart";

export default {
  components: {
    TripTypeChart
  },
  name: "TripTypes.vue",
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStats();
  },
  data: function() {
    return {
      data: [],
      layout: {
            title: 'Fahrten auf der ersten/letzten Meile',
            barmode: 'stack',
            xaxis: {
                ticksuffix: '%'
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
          .query({
            query: TRIP_TYPE_STATS
          })
          .then(res => {
            var trip_type_data = {
                x: [], y: [],
                type: 'bar',
                name: 'Fahrten, die nicht an einer ÖPNV Station beginnen/enden',
                orientation: 'h',
                 marker: {
                color: 'rgba(0,0,0,0.6)',
                width: 1
              },
            };
            var trip_type_nearby_station_data = {
                x: [], y: [],
                type: 'bar',
                name: 'Fahrten, die an einer ÖPNV Station beginnen/enden',
                orientation: 'h',
                 marker: {
                color: 'rgba(255,0,0,0.6)',
                width: 1
              },

            };

            var sum = 0
             for (var tt in res.data.tripTypes) {
                 sum = sum + res.data.tripTypes[tt].count;
             }


             console.log(sum)
             sum = sum / 100;
             console.log(sum)


            for (var tt in res.data.tripTypes) {
              trip_type_data.x.push(Math.floor(((res.data.tripTypes[tt].count - res.data.tripTypes[tt].countNearbyStation)/sum)*100)/100);
              trip_type_data.y.push(res.data.tripTypes[tt].name);

              trip_type_nearby_station_data.x.push(Math.floor(res.data.tripTypes[tt].countNearbyStation/sum* 100)/100);
              trip_type_nearby_station_data.y.push(res.data.tripTypes[tt].name);

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

<style scoped lang="scss">




</style>
