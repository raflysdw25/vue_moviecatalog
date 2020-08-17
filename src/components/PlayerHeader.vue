<template>
  <div class="player-header-container mt-4">
    <b-row>
      <b-col lg="6">Name : {{ playerData.name }}</b-col>
      <b-col lg="6">Age : {{ playerData.age }}</b-col>
      <b-col lg="6">
        Correct Answer :
        <span class="badge badge-success">{{ numCorrect }}</span>
      </b-col>
      <b-col lg="6">
        Answered Question :
        <span class="badge badge-info">{{ numTotal }}</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: ["numCorrect", "numTotal"],
  data() {
    return {
      playerData: {}
    };
  },
  mounted() {
    if (localStorage.playerData) {
      this.playerData = JSON.parse(localStorage.playerData);
    }
  }
};
</script>

<style lang="scss" scoped></style>
