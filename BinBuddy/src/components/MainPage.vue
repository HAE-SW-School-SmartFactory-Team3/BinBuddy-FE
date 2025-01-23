<template>
  <div class="container">
    <div class="header">
      <div></div>
    </div>
    <div class="content">
      <h1>let me see your trash...</h1>

      <p class="notice">“The Earth does not belong to us. We belong to the Earth.”</p>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  background-image: url("img/forest-bg.svg");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.header {
  height: 100px;
}
.content {
}
.notice {
  font-size: 30px;
}
.footer {
  height: 100px;
}
</style>
