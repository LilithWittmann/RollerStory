<template>
  <section class="trips-over-day page">
    <b-container>
      <b-row> <h2>Hamburg in Bewegung</h2></b-row>
      <b-row>
        <TripMovementChart />
      </b-row>
    </b-container>
  </section>
</template>

<script>
import TripMovementChart from "./visualisations/TripMovementChart";
export default {
  name: "AboutStory",
  components: { TripMovementChart }
};
</script>

<style scoped></style>
