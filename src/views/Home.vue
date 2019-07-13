<template>
  <div class="home">
    <Intro />
    <Facts />
  </div>
</template>

<script>

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

  // @ is an alias to /src
import Intro from "../components/Intro";
import Facts from "../components/Facts";


export default {
  name: "home",
  components: {
    Intro,
    Facts
  }
};
</script>
