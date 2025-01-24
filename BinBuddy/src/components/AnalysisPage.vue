<template>
  <div class="container">
    <header class="header">
      <div class="title-space"></div>
      <img :src="logo" alt="BinBuddy Logo" />
      <div class="title">BinBuddy</div>
    </header>
    <div class="ti">
      <p class="label">Sorting trash...</p>
    </div>
    <main class="content">
      <div class="imageSection">
        <div class="defaultImage">loading...</div>
      </div>
      <div class="menu-box">
        <div class="top-menu"></div>
        <div class="bottom-menu"></div>
      </div>
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
import { useRouter } from "vue-router"; // 라우터 사용

const router = useRouter();
const debug = ref("Awaiting upload...");
const selectedImage = ref(null); // 선택된 이미지 미리보기 URL

const goToMain = () => {
  router.push("/");
};
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
  goToAnalysis;
};

const imageSearch = () => {
  // TODO: API 호출, 이미지 검색 결과 UI ��신
  console.log("Image Search called");
  goToAnalysis;
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
  width: 100vw;
  height: 100vh;
  color: white;
}
.title-space {
  margin-left: 5%;
}
.title {
  font-size: 2rem;
  font-weight: bold;
}
.header {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 5%;
}
.ti {
  display: flex;
  width: 90%;
}
/* 콘텐츠 */
.content {
  text-align: center;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
/* 이미지 섹션 */
.label {
  font-size: 1rem;
}

.imageSection {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  border: solid 1px white;
}
.defaultImage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 94%;
  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */
  background: rgb(0, 0, 0);
}
.imageSection img {
  width: 80%;
  height: auto;
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
