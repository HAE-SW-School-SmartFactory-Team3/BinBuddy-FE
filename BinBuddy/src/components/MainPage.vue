<template>
  <div class="container">
    <main class="content">
      <div class="logo">
        <img :src="logo" alt="BinBuddy Logo" />
        <div class="title">BinBuddy</div>
      </div>
      <div class="search-bar">
        <input type="text" class="search-input" placeholder="Let me see your trash..." />
        <img :src="searchIcon" class="icon" alt="Search Icon" @click="textSearch" />
      </div>
      <div class="buttons">
        <!-- 이미지 업로드 -->
        <input type="file" accept="image/*" id="uploadInput" @change="handleFileChange" style="display: none" />
        <label for="uploadInput" class="custom-button">
          <img :src="uploadIcon" alt="Upload Icon" />
        </label>
        <!-- 후면 카메라 -->
        <input type="file" capture="environment" id="cameraInput" @change="handleFileChange" style="display: none" />
        <label for="cameraInput" class="custom-button">
          <img :src="cameraIcon" alt="Camera Icon" />
        </label>
      </div>
      <div class="quote">"The Earth does not belong to us."</div>
      <div class="quote">"We belong to the Earth."</div>
      <img
        v-if="selectedImage"
        :src="selectedImage"
        alt="Captured Image Preview"
        style="max-width: 40%; margin-top: 20px" />
      <div v-if="selectedImage" class="imageSearch">Analysis</div>
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
import uploadIcon from "../assets/img/image-icon.svg";
import cameraIcon from "../assets/img/camera-icon.svg";
import userIcon from "../assets/img/user-icon.svg";
import { ref } from "vue";
const debug = ref("Awaiting upload...");
const selectedImage = ref(null); // 선택된 이미지 미리보기 URL

// 파일/카메라 공통 핸들러
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    debug.value = `Selected file: ${file.name}`;
    selectedImage.value = URL.createObjectURL(file); // 미리보기 URL 생성
  } else {
    debug.value = "No file selected.";
  }
};

const textSearch = () => {
  // TODO: API 호출, 검색 결과 UI ��신
  console.log("Text Search called");
  console.log();
};

const imageSearch = () => {
  // TODO: API 호출, 이미지 검색 결과 UI ��신
  console.log("Image Search called");
};
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

.title {
  font-size: 2rem;
  font-weight: bold;
}
.logo {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 80px;
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
}
.buttons {
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10%;
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
  /* font-style: italic; */
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

.imageSearch {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  width: 20%;
  border-radius: 100px;
  border: solid 1px white;
}
/* 푸터 */
.footer {
  text-align: center;
  font-size: 16px;
  margin-bottom: 20px;
  width: 100%;
}
.line {
  margin-top: 20px;
  width: 100%;
  height: 2px;
  background: white;
}
.team {
  font-size: 18px;
}
</style>
