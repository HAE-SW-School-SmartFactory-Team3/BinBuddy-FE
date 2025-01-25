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

      <!-- 이미지 미리보기 -->
      <img
        v-if="selectedImage"
        :src="selectedImage"
        alt="Captured Image Preview"
        style="max-width: 40%; margin-top: 20px" />

      <!-- Analysis 버튼 -->
      <div v-if="selectedImage" class="imageSearch" @click="imageSearch">Analysis</div>

      <!-- 로딩 화면 -->
      <div v-if="loading" class="loading-overlay">
        <p>Analyzing your trash...</p>
      </div>
    </main>

    <footer class="footer">
      <div class="line"></div>
      <p class="team">HAE Mobility SW School Team 3</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDetectedItemsStore } from "../stores/detectedItems";
import { useRouter } from "vue-router";
import logo from "../assets/img/logo.svg";
import searchIcon from "../assets/img/search-icon.svg";
import uploadIcon from "../assets/img/image-icon.svg";
import cameraIcon from "../assets/img/camera-icon.svg";

// 상태 관리
const router = useRouter();
const selectedFile = ref(null); // 업로드된 파일
const selectedImage = ref(null); // 미리보기 이미지 URL
const loading = ref(false); // 로딩 상태
const debug = ref("Awaiting upload...");
const detectedItems = ref([]); // 감지된 항목 저장

const navigateToAnalysis = () => {
  router.push("/analysis");
};

// 파일 선택 핸들러
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file; // 파일 저장
    selectedImage.value = URL.createObjectURL(file); // 미리보기 URL 생성
    debug.value = `Selected file: ${file.name}`;
  } else {
    debug.value = "No file selected.";
  }
};

// 이미지 분석 요청
const imageSearch = async () => {
  const detectedItemsStore = useDetectedItemsStore();

  if (!selectedFile.value) {
    alert("No image selected!");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile.value);

  loading.value = true; // 로딩 화면 표시
  try {
    const response = await fetch("http://175.197.246.10:35000/api/v1/image-analysis", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // 서버 응답 받기
    console.log(result);

    // items 데이터 매핑
    const items = result.analysis.items.map((item) => ({
      original: URL.createObjectURL(selectedFile.value),
      bbox: item.bbox,
      confidence: item.confidence,
      image: item.image,
      number: item.number,
      type: item.type,
    }));

    // guidelines 데이터 추가
    const guidelines = result.analysis.guidelines;

    // 스토어에 저장
    detectedItemsStore.setItems(items);
    detectedItemsStore.setGuidelines(guidelines);

    console.log("Detected Items:", items);
    console.log("Guidelines:", guidelines);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to analyze the image. Please try again.");
  } finally {
    loading.value = false; // 로딩 화면 숨기기
    navigateToAnalysis();
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 1000;
}

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
