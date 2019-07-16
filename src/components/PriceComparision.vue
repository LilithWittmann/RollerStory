<template>
  <section class="facts  page">
    <b-container>
      <b-row>
        <col>
        <h2>Der Preis</h2>
        </col>
      </b-row>
      <Scrollama
      :offset="0.5"
           @step-enter="stepEnterHandler"

    >
      <b-row class="scrollama-container">
        <div class="col-sm-12 col-md-12 col-lg-6 story scrollama-steps" data-step="a">
          <p>Fast alle neuen Angebote, die in den letzten Jahren neu entstanden sind befinden sich im Preissegment obberhalb der Preise des ÖPNVs.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div class="numbers">
          <blockquote cite="https://www.huxley.net/bnw/four.html">
              <p>Anzahl der Menschen, die in Hamburg im Servicegebiet von mindestens einem e-Scooter-Anbieter leben: <span>{{suburbStats.suburbsWithScooterPopulation}}</span></p>
          </blockquote>
          <blockquote cite="https://www.huxley.net/bnw/four.html">
              <p>Anzahl der Menschen, die in Hamburg ausserhalb der Servicegebiete aller e-Scooter-Anbieter leben: <span>{{suburbStats.suburbsWithoutScooterPopulation}}</span></p>
          </blockquote>
          </div>
          <div class="numbers">
          <blockquote cite="https://www.huxley.net/bnw/four.html">
              <p>Durchschnittseinkommen der Menschen, die in Hamburg im Servicegebiet von mindestens einem e-Scooter-Anbieter leben: <span> <br>{{suburbStats.suburbsWithScooterAverageIncome|currency('€', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true})}}</span></p>
          </blockquote>
          <blockquote cite="https://www.huxley.net/bnw/four.html">
              <p>Durchschnittseinkommen der Menschen, die in Hamburg ausserhalb der Servicegebiete aller e-Scooter-Anbieter leben: <span> <br>{{suburbStats.suburbsWithoutScooterAverageIncome|currency('€', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true})}}</span></p>
          </blockquote>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
                 Gerade in Deutschland wird das durch das vergleichsweise gut ausgebaute ÖPNV-Netz spannend, da der eScooter aufgrund seiner Geschwindigkeit häufig nur auf der ersten/letzten Meile und im Nahbereich einen Zeitvorteil bietet.

             </p>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6 scrollama-graphic" slot="graphic">
          <h3>Eine Strecke im Nahbereich (4 km) kosten in Hamburg …</h3>
          <div class="price-boxes">
            <b-row>
              <div class="price-box col" style="background-color: #fc0; color: #000;">
                <div class="price">9,00 €</div>
                <small>mit einem Taxi.</small>
              </div>
              <div class="price-box col" style="background-color: #224059; color: #fff;">
                <div class="price">5,50 €</div>
                <small>mit einem Moia (Ride-Sharing).</small>
              </div>
              <div class="price-box col" style="background-color: #24d000; color: #000;">
                <div class="price">4,00 €</div>
                <small>mit einem Lime e-Scooter.</small>
              </div>
              <div class="price-box col" style="background-color: #69d2aa; color: #000000;">
                <div class="price">3,85 €</div>
                <small>mit einem Tier e-Scooter.</small>
              </div>
              <div class="price-box col" style="background-color: #00a0e1; color: #000000;">
              <div class="price">3,48 €</div>
              <small>mit einem car2go Auto.</small>
            </div>
            <div class="price-box col" style="background-color: #f46c62; color: #000000;">
                <div class="price">3,25 €</div>
              <small>mit einem Voi e-Scooter.</small>
            </div>
            <div class="price-box col" style="background-color: #cc0025; color: #fff;">
              <div class="price">2,23 €</div>
              <small>mit Bus/Bahn (HVV).</small>
            </div>
            <div class="w-100"></div>
              <div class="price-box col">
              <div class="price">1,35 €</div>
              <small>mit eigenen Kleinwagen.</small>
            </div>
            <div class="price-box col"  style="background-color: #003063;; color: #fff;">
                <div class="price">0,00 €</div>
              <small>mit einem Hamburger StadtRAD.</small>
            </div>

            <div class="price-box col" style="background-color: #A0522D; color: #fff;" 	>
              <div class="price">0,00 €</div>
                <small>zu Fuß.</small>
            </div>
            </b-row>

          </div>
        </div>

      </b-row>
        </Scrollama>
    </b-container>
  </section>
</template>

<script>

  import "intersection-observer";
import Scrollama from "vue-scrollama";
  import {COMPARE_SERVICES, SUBURB_STATS} from "../constants/graphql";

export default {
components: {
    Scrollama
  },
  methods: {
    stepEnterHandler ({element, index, direction}) {
      // handle the step-event as required here
      console.log(element, index, direction)
    }
  },
  name: "PriceComparision",

 created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getStats();
  },
  data() {
    return {
      currStep: null,
      suburbStats: false,
      getStats: function() {
        this.$apollo
          .query({
            query: SUBURB_STATS
          })
          .then(res => {
            this.suburbStats = res.data.suburbStats[0];
          })
          .catch(err => {
            console.log(err);
          });
      },
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="vue-scrollama/dist/vue-scrollama.css"></style>
<style scoped lang="scss">


@media (min-width: 992px) {

.scrollama-container {
  display: flex;
}
.scrollama-graphic {
  flex: 1;
  height: 70vh;
  top: 3vh;
  position: sticky!important;
}
.scrollama-steps {
  flex: 2;
}
  }


</style>
