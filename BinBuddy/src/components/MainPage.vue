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
      <div class="search-bar">
        <img :src="search" @click="searchItem" class="search-item" />
        <input class="search-input" type="text" placeholder="let me see your trash..." />
      </div>

      <p class="notice">“The Earth does not belong to us. We belong to the Earth.”</p>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import logo from "../assets/img/logo.svg";
import search from "../assets/img/search-icon.svg";
import image from "../assets/img/image-icon.svg";
import cam from "../assets/img/cam-icon.svg";
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search-bar {
  display: flex;
  align-items: center;
  padding-left: 30px;
  width: 800px;
  height: 70px;
  border: solid 2px white;
  border-radius: 35px;
}
.search-item {
  cursor: pointer;
  margin-right: 20px;
}
.search-input {
  width: 500px;
  height: 40px;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 24px;
}
input::placeholder {
  color: white; /* 원하는 색상 */
}
.notice {
  font-size: 32px;
}
.footer {
  height: 100px;
}

.space {
  width: 40px;
}
</style>
