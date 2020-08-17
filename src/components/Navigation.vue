<template>
  <div class="navigation">
    <b-navbar toggleable="lg" type="dark" class="bg-main">
      <b-navbar-brand>OurShow</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <b-icon icon="tv"></b-icon> TV Show
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/quiz" class="nav-link">
              <b-icon icon="question-circle-fill"></b-icon> Quiz
            </router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.b-icon {
  margin-right: 8px;
}

.navbar {
  padding: 0 50px;

  .navbar-brand {
    font-size: 40px;
    font-weight: bold;
  }

  .navbar-nav {
    .nav-item {
      margin: 10px;

      .nav-link {
        font-size: 1.25rem;
        &:focus {
          color: rgba(255, 255, 255, 1);
          font-weight: 600;
        }
      }
    }
  }
}

@media only screen and (max-device-width: 480px) {
  .navbar {
    padding: 10px 20px;
    .navbar-brand {
      font-size: 25px;
      font-weight: 400;
    }
    .navbar-nav {
      .nav-item {
        .nav-link {
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>
