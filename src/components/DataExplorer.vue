<template xmlns="http://www.w3.org/1999/html">

<section class="page">
<b-container>
  <b-row>
    <col>
    <h2>Selbst forschen</h2>
    </col>
  </b-row>
    <b-row>
     <div class="col-sm-12 col-md-12 col-lg-4 story " >
         <div class="filter-sentence" >
             <p>Zeige mir für<br>
                 <select class="select-dropdown" :v-model="currentVisualisation.timeFrame" @change="updateVisualisation($event)" name="timeFrame">
                     <option value="TODAY">heute</option>
                     <option value="THIS_WEEK">diese Woche</option>
                     <option value="THIS_MONTH">diesen Monat</option>
                     <option value="ALL_TIME">alle Daten</option>
                 </select>
                 <select class="select-dropdown" :v-model="currentVisualisation.primaryDimension" @change="updateVisualisation($event)"  name="primaryDimension">
                     <option value="ALL">alle Fahrten,</option>
                     <option value="SHORT">kurze Fahrten,</option>
                     <option value="LONG">lange Fahrten,</option>
                     <option value="FUN">vermutlich Spaßfahrten,</option>
                     <option value="ONLY_TRIPS_STARTED_AT_STATION">Fahrten von einer Bahnstation,</option>
                     <option value="ONLY_TRIPS_ENDED_AT_STATION">Fahrten zu einer Bahnstation,</option>
                     <option value="STARTET_AND_ENDED_AT_STATION">Fahrten von/zu einer Bahnstation,</option>
                     <option value="GROUP_TRIPS">Gruppenfahrten,</option>
                 </select>
                 <select class="select-dropdown" :v-model="currentVisualisation.dayTimeFrame"  @change="updateVisualisation($event)" name="dayTimeFrame">
                     <option value="ALL_DAY">die den ganzen Tag über</option>
                     <option value="MORNING">die am Morgen</option>
                     <option value="FORENOON">die am Vormittag</option>
                     <option value="NOON">die am Mittag</option>
                     <option value="AFTERNOON">die am Nachmittag</option>
                     <option value="EVENING">die am Abend</option>

                 </select>
                 beginnen, als
                 <select class="select-dropdown" :v-model="currentVisualisation.visualisationType"  @change="updateVisualisation($event)" name="visualisationType">
                     <option value="dotMap">Karte</option>
                     <option value="weekddayHourHeatmap">Tageszeitenverteilung</option>
                     <option value="tripTypeChart">Fahrttypenstatistik</option>
                     <option value="serviceProviderComparison">Anbietervergleich</option>
                     <option value="suburbMap">Stadteilkarte</option>

                 </select></p>
            </div>

     </div>
         <div class="col-sm-12 col-md-12 col-lg-8 " >
            <TripTypeChart :day-time-frame="currentVisualisation.dayTimeFrame"
                           :time-frame="currentVisualisation.timeFrame"
                           :trip-type="currentVisualisation.tripType"
                           :ended-at-station="currentVisualisation.endedAtStation"
                           :started-at-station="currentVisualisation.startedAtStation"
                           v-if="currentVisualisation.visualisationType=='tripTypeChart'"></TripTypeChart>

            <WeekdayHourHeatmap :day-time-frame="currentVisualisation.dayTimeFrame"
                           :time-frame="currentVisualisation.timeFrame"
                           :trip-type="currentVisualisation.tripType"
                           :ended-at-station="currentVisualisation.endedAtStation"
                           :started-at-station="currentVisualisation.startedAtStation"
                           v-if="currentVisualisation.visualisationType=='weekddayHourHeatmap'"></WeekdayHourHeatmap>
         </div>
    </b-row>

</b-container>
</section>

</template>

<script>
    import Loading from "./Loading";
    import TripTypeChart from "./visualisations/TripTypeChart";
    import WeekdayHourHeatmap from "./visualisations/WeekdayHourHeatmap";
    export default {
        name: "DataExplorer.vue",
        components: {TripTypeChart, Loading,WeekdayHourHeatmap},

          data() {
            return {
              currentVisualisation: {
                "dayTimeFrame": "ALL_DAY",
                "timeFrame": "ALL_TIME",
                "tripType": "ALL",
                "endedAtStation": null,
                "startedAtStation": null,
                  "primaryDimension": "ALL",
                  "visualisationType": "tripTypeChart",

              },
              updateVisualisation: function(ev) {
                console.log(ev);
                if(ev.target.name == "primaryDimension"){
                    if (ev.target.value == "ONLY_TRIPS_STARTED_AT_STATION") {
                        this.currentVisualisation["startedAtStation"] = true;
                        this.currentVisualisation["endedAtStation"] = false;
                        this.currentVisualisation["tripType"] = "ALL";


                    } else if(ev.target.value == "ONLY_TRIPS_ENDED_AT_STATION") {

                        this.currentVisualisation["startedAtStation"] = false;
                        this.currentVisualisation["endedAtStation"] = true;
                        this.currentVisualisation["tripType"] = "ALL";

                    } else if(ev.target.value == "STARTET_AND_ENDED_AT_STATION"){

                        this.currentVisualisation["startedAtStation"] = true;
                        this.currentVisualisation["endedAtStation"] = true;
                        this.currentVisualisation["tripType"] = "ALL";
                    } else if(ev.target.value == "GROUP_TRIPS"){

                        this.currentVisualisation["startedAtStation"] = null;
                        this.currentVisualisation["endedAtStation"] = null;
                        this.currentVisualisation["tripType"] = "ALL";
                        // TODO: not implemented in backend
                    } else {
                        this.currentVisualisation["startedAtStation"] = null;
                        this.currentVisualisation["endedAtStation"] = null;
                        this.currentVisualisation["tripType"] =  ev.target.value;
                    }

                } else {
                    this.currentVisualisation["startedAtStation"] = null;
                    this.currentVisualisation["endedAtStation"] = null;
                }

                 this.currentVisualisation[ev.target.name] = ev.target.value;

              },
            };
          }
    }
</script>

<style scoped lang="scss">
    .filter-sentence {

    }
    .loading-anim {
        margin-top: 8vh;
    }

    .filter-sentence  .select-dropdown {
        background-color: #fff;
        background-image: none;
        padding: 6px;
        font-size: 1.5rem;
        line-height: 2rem;
        text-align: center;
        font-family: "Open Sans Condensed", sans-serif;
        font-weight: 700;
        font-style: normal;
        margin-bottom: 10px;
        border-radius: 1px;
        outline: 2px inset black;
        outline-offset:-2px

    }

    .select-css::-ms-expand {
	    display: none;
    }
    .select-css:hover {
        border-color: #000;
    }
    .select-css:focus {
        border-color: #000;
        box-shadow: none;
        color: #222;
        outline: none;
    }
    .chart{
        @media (min-width: 992px) {
            margin-top: -70px;
        }

    }
</style>