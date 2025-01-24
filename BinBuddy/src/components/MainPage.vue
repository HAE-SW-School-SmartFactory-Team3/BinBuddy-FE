<template>
  <div class="container">
    <header class="header">
      <div class="profile-icon">
        <img :src="userIcon" alt="Profile Icon" />
      </div>
    </header>

    <main class="content">
      <div class="logo">
        <img :src="logo" alt="BinBuddy Logo" />
        <div class="title">BinBuddy</div>
      </div>
      <div class="search-bar">
        <img :src="searchIcon" class="icon" alt="Search Icon" />
        <input type="text" class="search-input" placeholder="Let me see your trash..." />
        <img :src="imageIcon" class="icon image" alt="Image Icon" />
        <img :src="cameraIcon" class="icon" alt="Camera Icon" />
      </div>

      <div class="quote">"The Earth does not belong to us."</div>
      <div class="quote">"We belong to the Earth."</div>
    </main>

    <footer class="footer">
      <div class="line"></div>
      <p class="team">HAE Mobility SW School Team 3</p>
    </footer>
  </div>
</template>

<script setup>
import logo from "../assets/img/logo.svg";
import searchIcon from "../assets/img/search-icon.svg";
import imageIcon from "../assets/img/image-icon.svg";
import cameraIcon from "../assets/img/cam-icon.svg";
import userIcon from "../assets/img/user-icon.svg";
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
  background-image: url("../assets/img/forest-bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: white;
}

/* 헤더 */
.header {
  display: flex;
  justify-content: right;
  align-items: center;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 50px;
}

.title {
  font-size: 2rem;
  font-weight: bold;
}
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.logo img {
  height: 40px;
  margin-right: 10px;
}

.logo span {
  font-size: 24px;
  font-weight: bold;
}

.profile-icon img {
  height: 30px;
  width: 30px;
}

/* 콘텐츠 */
.content {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 2px white;
  width: 80%;
  height: 60px;
  border-radius: 30px;
  padding: 0 15px;
  margin-bottom: 100px;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: white;
  font-size: 1.2rem;
  padding: 0 10px;
}

.search-input::placeholder {
  color: rgb(255, 255, 255);
  font-style: italic;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.image {
  margin-right: 20px;
}

/* 문구 */
.quote {
  font-size: 1.4rem;
  line-height: 1.5;
}

/* 푸터 */
.footer {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
}
.line {
  width: 100%;
  height: 2px;
  background: white;
}
.team {
  font-size: 18px;
}
</style>
