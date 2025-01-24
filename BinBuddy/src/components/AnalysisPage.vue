<template>
  <div class="container">
    <header class="header">
      <div class="title-space"></div>
      <img :src="logo" alt="BinBuddy Logo" />
      <div class="title">BinBuddy</div>
    </header>
    <main class="content">
      <div class="imageSection">
        <div class="imageWrapper">
          <!-- 이미지 렌더링 -->
          <img
            class="defaultImage"
            :src="items[0]?.original"
            alt="Original Image"
            v-if="items[0]?.original"
            ref="imageRef" />
          <!-- BBOX 그리기 -->
          <div
            v-for="(item, index) in items"
            :key="index"
            class="bbox"
            :style="getBoundingBoxStyle(item.bbox, imageDimensions.width, imageDimensions.height)">
            <span>{{ item.type }} ({{ (item.confidence * 100).toFixed(1) }}%)</span>
          </div>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.type }} - Confidence: {{ (item.confidence * 100).toFixed(1) }}% - BBOX: {{ item.bbox }}
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup>
import logo from "../assets/img/logo.svg";
import { useDetectedItemsStore } from "../stores/detectedItems";
import { ref, computed } from "vue";

const detectedItemsStore = useDetectedItemsStore();
const items = detectedItemsStore.items;

const IMAGE_WIDTH = 640; // 백엔드 기준 너비
const IMAGE_HEIGHT = 480; // 백엔드 기준 높이

// 이미지 크기 변환 후 BBOX 스타일 계산 함수s
const getBoundingBoxStyle = (bbox, imageWidth, imageHeight) => {
  const scaleX = imageWidth / IMAGE_WIDTH; // 너비 비율
  const scaleY = imageHeight / IMAGE_HEIGHT; // 높이 비율
  const [x, y, width, height] = bbox;
  return {
    position: "absolute",
    border: "2px solid red",
    color: "white",
    left: `${((x * scaleX) / imageWidth) * 100}%`,
    top: `${((y * scaleY) / imageHeight) * 100}%`,
    width: `${(((width - x) * scaleX) / imageWidth) * 100}%`,
    height: `${(((height - y) * scaleY) / imageHeight) * 100}%`,
  };
};

// 이미지 렌더링 후 크기 계산
const imageRef = ref(null);
const imageDimensions = computed(() => {
  if (imageRef.value) {
    console.log(imageRef.value.clientWidth, imageRef.value.clientHeight);
    return {
      width: imageRef.value.clientWidth,
      height: imageRef.value.clientHeight,
    };
  }
  return { width: 0, height: 0 };
});
</script>

<style scoped>
.point {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red; /* 기본 색상 */
  z-index: 10; /* 이미지 위에 표시되도록 설정 */
}

.imageWrapper {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
}

.bbox {
  position: absolute;
  border: 2px solid red;
  color: white;
  background-color: rgba(255, 0, 0, 0.5);
  font-size: 12px;
  z-index: 10;
  pointer-events: none; /* 클릭 방지 */
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
  width: 80%;
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
  width: 80%;
  aspect-ratio: 3/4; /* 1:1 비율 유지 */
  border: solid 1px white;
}
.defaultImage {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  width: 100%;
  aspect-ratio: 3/4; /* 1:1 비율 유지 */
  background: rgb(0, 0, 0);
}
.imageSection img {
  width: 100%;
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
