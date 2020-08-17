<template>
  <div class="tv-show-container">
    <b-container>
      <h1 class="mb-2">Popular TV Shows</h1>
      <b-row class="mb-4">
        <b-col>
          <b-dropdown size="sm" text="Sort Display" variant="info">
            <b-dropdown-item-button
              v-for="display in displayShows"
              :key="display"
              @click="countDisplay(display)"
              >{{
                display === 0 ? "All Shows" : display
              }}</b-dropdown-item-button
            >
          </b-dropdown>
          <b-button
            variant="info"
            size="sm"
            class="ml-2"
            v-b-tooltip.hover
            title="Display Item in Table"
            @click="displayItem"
            v-if="displayGrid"
          >
            <b-icon icon="table"></b-icon>
          </b-button>
          <b-button
            variant="info"
            size="sm"
            class="ml-2"
            v-b-tooltip.hover
            title="Display Item in Grid"
            @click="displayItem"
            v-if="!displayGrid"
          >
            <b-icon icon="grid3x3-gap-fill"></b-icon>
          </b-button>
        </b-col>
      </b-row>
      <ShowItem
        :tvshows="tvshows"
        v-if="displayGrid"
        :sortDisplay="sortDisplay"
      />
      <TableShow
        :values="tvshows"
        :sortDisplay="sortDisplay"
        v-if="!displayGrid"
      />
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import ShowItem from "@/components/ShowItem.vue";
import TableShow from "@/components/TableShow.vue";

const popular_tv = "https://api.themoviedb.org/3/tv/popular";
const api_key = "b06556dda660eba54ee84b7c6573cded";

export default {
  name: "TvShow",
  components: {
    ShowItem,
    TableShow
  },
  data() {
    return {
      tvshows: [],
      displayShows: [0, 3, 5, 10],
      sortDisplay: 0,
      displayGrid: true
    };
  },
  mounted() {
    this.loadPopularTv();
  },
  methods: {
    loadPopularTv() {
      axios
        .get(`${popular_tv}?api_key=${api_key}`)
        .then(response => {
          this.tvshows = response.data.results;
        })
        .catch(error => {
          console.log(error);
        });
    },
    countDisplay(count) {
      this.sortDisplay = count;
    },
    displayItem() {
      this.displayGrid = !this.displayGrid;
    }
  }
};
</script>
