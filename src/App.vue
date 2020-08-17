<template>
  <div id="app">
    <div id="nav">
      <Navigation />
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
export default {
  components: {
    Navigation,
    Footer
  }
};
</script>
<style lang="scss"></style>
