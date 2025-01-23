<template>
  <div class="container">
    <div class="header">
      <div class="header-left"><img :src="logo" /> BinBuddy</div>
      <div class="header-right">
        <div>My Page</div>
        <div class="space"></div>
        <div>Login</div>
      </div>
    </div>
    <div class="content">
      <h1>let me see your trash...</h1>

      <p class="notice">“The Earth does not belong to us. We belong to the Earth.”</p>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import logo from "../assets/img/logo.svg";
</script>

<style scoped>
.container {
  background-image: url("../assets/img/forest-bg.svg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-left {
  font-size: 40px;
  margin-left: 80px;
  font-weight: bold;
}
.header-right {
  font-size: 20px;
  margin-right: 100px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.header-right-inner {
  display: flex;
  align-items: space-between;
}
.content {
}
.notice {
  font-size: 30px;
}
.footer {
  height: 100px;
}

.space {
  width: 40px;
}
</style>
