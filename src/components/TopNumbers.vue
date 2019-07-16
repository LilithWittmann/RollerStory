<template>
  <section class="top-numbers page">
    <b-container>
      <b-row>
        <col>
        <h2>Anbieter im Vergleich</h2>
        </col>
      </b-row>
      <b-row>
        <div v-if="stats" class="col-sm-12 col-md-12 col-lg-12 numbers-row">
          <h3> Geschätzte Dauer eines Trips in Minuten</h3>
          <div  class="price-boxes row">
            <div v-for="pv in stats"
              class="price-box col"
              :style="{'background-color': pv.serviceProvider.primaryColor, 'color': pv.serviceProvider.textColor}"
            >
              <div class="price">{{pv.averageDuration}}</div>
              <small>{{pv.serviceProvider.name }} e-Scooteer</small>
            </div>

          </div>
        </div>
      </b-row>
      <b-row>
        <div v-if="stats" class="col-sm-12 col-md-12 col-lg-12 numbers-row">
          <h3>Geschätzter Umsatz pro Trip</h3>
          <div  class="price-boxes row">
            <div v-for="pv in stats"
              class="price-box col"
             :style="{'background-color': pv.serviceProvider.primaryColor, 'color': pv.serviceProvider.textColor}"
            >
              <div class="price">{{pv.averagePrice|currency('€', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true})}}</div>
              <small>{{pv.serviceProvider.name }} e-Scooteer</small>
            </div>

          </div>
        </div>
      </b-row>
      <b-row>
        <div v-if="stats" class="col-sm-12 col-md-12 col-lg-12 numbers-row">
          <h3>Geschätzte zurückgelegte Entfernung in Metern pro Trip</h3>
          <div  class="price-boxes row">
            <div v-for="pv in stats"
              class="price-box col"
             :style="{'background-color': pv.serviceProvider.primaryColor, 'color': pv.serviceProvider.textColor}"
            >
              <div class="price">{{pv.averageDistance}}</div>
              <small>{{pv.serviceProvider.name }} e-Scooter</small>
            </div>

          </div>
        </div>
      </b-row>
      <b-row>
        <div v-if="stats" class="col-sm-12 col-md-12 col-lg-12 numbers-row">
          <h3>Anzahl der Roller, die in den letzten 24h verfügbar waren:</h3>
          <div  class="price-boxes row">
            <div v-for="pv in stats"
              class="price-box col"
             :style="{'background-color': pv.serviceProvider.primaryColor, 'color': pv.serviceProvider.textColor}"
            >
              <div class="price">{{pv.countScooters}}</div>
              <small>{{pv.serviceProvider.name }} e-Scooter</small>
            </div>

          </div>
        </div>
      </b-row>
      <b-row>
        <div v-if="stats" class="col-sm-12 col-md-12 col-lg-12 numbers-row">
          <h3>Anzahl der Trips in den letzten 24h:</h3>
          <div  class="price-boxes row">
            <div v-for="pv in stats"
              class="price-box col"
             :style="{'background-color': pv.serviceProvider.primaryColor, 'color': pv.serviceProvider.textColor}"
            >
              <div class="price">{{pv.countTrips }}</div>
              <small>{{pv.serviceProvider.name }} e-Scooter</small>
            </div>

          </div>
        </div>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import {COMPARE_SERVICES} from "../constants/graphql";

export default {
  name: "TopNumbers",
      created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStats();
  },
  data() {
    return {
      currStep: null,
      stats: false,
      getStats: function() {
        this.$apollo
          .query({
            query: COMPARE_SERVICES
          })
          .then(res => {
            this.stats = res.data.dayStats;
          })
          .catch(err => {
            console.log(err);
          });
      },
    };
  }
};
</script>

<style scoped>

    .numbers-row {
        padding-top: 40px;
    }
</style>
