<template>
  <v-app>
    <Header />
    <v-main style="--v-layout-bottom: 0px">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
<style>
.v-application__wrap {
  min-height: 0 !important;
  padding-top: 100px;
}

html::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}

html::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
}

html::-webkit-scrollbar-track {
  background: transparent;
}
</style>
