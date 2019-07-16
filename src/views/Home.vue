<template>
  <div class="home">
    <Intro />
    <AboutStory />
    <TripTypes />
    <PriceComparision />
    <TopNumbers />
    <DataExplorer />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "../components/Intro";
import PriceComparision from "../components/PriceComparision";
import TopNumbers from "../components/TopNumbers";
import TripTypes from "../components/TripTypes";
import DataExplorer from "../components/DataExplorer";
import AboutStory from "../components/AboutStory";

export default {
  name: "home",
  components: {
    AboutStory,
    DataExplorer,
    Intro,
    PriceComparision,
    TopNumbers,
    TripTypes
  }
};
</script>

<style lang="scss">
h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}

h2 {
  font-family: "Open Sans", sans-serif;
  font-size: 14px !important;
  text-transform: uppercase;
  color: #ffffff;
  background-color: #111111;
  display: inline-block;
  padding: 12px 15px 13px 15px;
  @media (max-width: 992px) {
    margin-left: 15px;
  }
}

.page {
  margin: 0;
  padding-top: 50px;
  padding-bottom: 100px;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
}

.story {
  font-family: "Bitter", serif;
  font-weight: normal;
  word-wrap: break-word;
  font-size: 23px;
  line-height: 1.6em;
  @media (min-width: 992px) {
    margin-left: -15px;
  }
}

.story > p {
  -webkit-margin-before: 0em;
  -webkit-margin-after: 1.4em;
  margin-bottom: 1.4em;
}

.price-boxes {
  display: inline-block;
  justify-content: center;
}
.price-box {
  padding-top: 20px;
  min-width: 150px;
  height: 150px;
  background-color: #000;
  color: #fff;
  margin: 10px;
  text-align: center;
  vert-align: middle;
  @media (min-width: 992px) {
    min-width: 140px;
    margin: 8px;
  }
}

.price-box > .price {
  font-size: 2.5rem;
  text-align: center;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 700;
}
.price-box > small {
  font-size: 0.8rem;
  line-height: 0.7rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}

.numbers {
  background-color: #fff;
  font-style: italic;
  color: #000;
  padding: 10px;
}

.numbers.inverted {
   background-color: #000;
  color: #fff;
}

.numbers span {
  font-size: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: 700;
  font-style: normal;
}
</style>
