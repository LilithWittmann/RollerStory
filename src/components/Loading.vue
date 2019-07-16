<template>
  <div class="loading">
    <div class="scooter">
      <img src="../assets/scooter.png" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Loading"
};
</script>

<style scoped lang="scss">
.loading {
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 75px;
  border: 4px solid #333;
  overflow: hidden;

  .scooter {
    height: 100px;
    width: 100px;
    position: relative;
    margin-top: 25px;
  }

  .scooter > img {
    height: 75px;
    animation-name: example;
    animation-duration: 3s;
    animation-iteration-count: 100;
  }

  /* Standard syntax */
  @keyframes example {
    0% {
      margin-left: -70px;
      top: 0px;
    }
    50% {
      margin-left: 30px;
      top: 0px;
    }
    53% {
      margin-left: 50px;
      top: 0px;
    }
    100% {
      margin-left: 180px;
      top: 0px;
    }
  }
}
</style>
