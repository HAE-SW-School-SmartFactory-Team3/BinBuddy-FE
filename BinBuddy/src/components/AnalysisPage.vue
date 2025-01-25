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
            v-for="(item, index) in filteredItems"
            :key="index"
            class="bbox"
            :style="getBoundingBoxStyle(item.bbox, imageDimensions.width, imageDimensions.height, item.type)">
            <span>{{ item.type }} ({{ (item.confidence * 100).toFixed(1) }}%)</span>
          </div>
          <div
            v-for="(item, index) in filteredItems"
            :key="index"
            class="bbox"
            :style="getBoundingBoxStyle2(item.bbox, imageDimensions.width, imageDimensions.height, item.type)">
            <span>{{ item.type }} ({{ (item.confidence * 100).toFixed(1) }}%)</span>
          </div>
        </div>
      </div>

      <!-- 동적 카테고리 선택 -->
      <div class="categories">
        <button
          v-for="category in uniqueCategories"
          :key="category"
          :class="{ active: selectedCategory === category }"
          @click="selectCategory(category)">
          {{ category }}
        </button>
      </div>

      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item.type }} - Confidence: {{ (item.confidence * 100).toFixed(1) }}% - BBOX: {{ item.bbox }}
        </li>
      </ul>
    </main>
    <footer class="footer">
      <div class="line"></div>
      <p class="team">HAE Mobility SW School Team 3</p>
    </footer>
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

// 색상 목록
const colorList = [
  "rgba(0, 128, 128,0.6)", // 청록
  "rgba(255, 0, 0,0.6)", // 빨강
  "rgba(0, 0, 255,0.6)", // 파랑
  "rgba(0, 255, 0,0.6)", // 초록
  "rgba(255, 165, 0,0.6)", // 주황
  "rgba(128, 0, 128,0.6)", // 보라
];

// 고유 카테고리 추출 및 색상 매핑
const uniqueCategories = computed(() => {
  const types = [...new Set(items.map((item) => item.type))];
  return ["All", ...types]; // "All" 포함
});

const categoryColors = ref({});
uniqueCategories.value.forEach((category, index) => {
  if (category !== "All") {
    categoryColors.value[category] = colorList[index % colorList.length];
  }
});

// 카테고리 선택 상태
const selectedCategory = ref("All");

// 필터링된 항목
const filteredItems = computed(() => {
  if (selectedCategory.value === "All") return items;
  return items.filter((item) => item.type === selectedCategory.value);
});

// 카테고리 선택 핸들러
const selectCategory = (category) => {
  selectedCategory.value = category;
};

// 박스 색상 반환
const getBoxColor = (type) => {
  return categoryColors.value[type] || "rgba(255, 255, 0, 0.5)"; // 기본값: 노란색
};

// BBOX 스타일 계산
const getBoundingBoxStyle = (bbox, imageWidth, imageHeight, type) => {
  const scaleX = imageWidth / IMAGE_WIDTH; // 너비 비율
  const scaleY = imageHeight / IMAGE_HEIGHT; // 높이 비율
  const [x, y, width, height] = bbox;

  return {
    position: "absolute",
    border: `2px solid ${getBoxColor(type)}`,
    color: "black",
    left: `${((x * scaleX) / imageWidth) * 100}%`,
    top: `${((y * scaleY) / imageHeight) * 100}%`,
    width: `${(((width - x) * scaleX) / imageWidth) * 100}%`,
    height: `${(((height - y) * scaleY) / imageHeight) * 100}%`,
    // backgroundColor: getBoxColor(type), // 배경색
    // padding: "2px 4px", // 텍스트 주변 여백
    // borderRadius: "4px", // 둥근 모서리 (선택 사항)
    // display: "inline-block", // 텍스트 영역에만 적용
  };
};
const getBoundingBoxStyle2 = (bbox, imageWidth, imageHeight, type) => {
  const scaleX = imageWidth / IMAGE_WIDTH; // 너비 비율
  const scaleY = imageHeight / IMAGE_HEIGHT; // 높이 비율
  const [x, y, width, height] = bbox;

  return {
    position: "absolute",
    border: `2px solid ${getBoxColor(type)}`,
    color: "white",
    fontWeight: "bold",
    left: `${((x * scaleX) / imageWidth) * 100}%`,
    top: `${((y * scaleY) / imageHeight) * 100}%`,
    width: `${(((width - x) * scaleX) / imageWidth) * 100}%`,
    // height: `${(20 / imageHeight) * 100}%`,
    backgroundColor: getBoxColor(type), // 배경색
    // padding: "2px 4px", // 텍스트 주변 여백
    // borderRadius: "4px", // 둥근 모서리 (선택 사항)
    // display: "inline-block", // 텍스트 영역에만 적용
  };
};

// 이미지 크기 계산
const imageRef = ref(null);
const imageDimensions = computed(() => {
  if (imageRef.value) {
    return {
      width: imageRef.value.clientWidth,
      height: imageRef.value.clientHeight,
    };
  }
  return { width: 0, height: 0 };
});
</script>

<style scoped>
/* 카테고리 버튼 */
.categories {
  margin: 20px;
  text-align: center;
}
.categories button {
  padding: 10px 20px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  color: black;
  cursor: pointer;
}
.categories button.active {
  background-color: black;
  color: white;
}

/* 이미지 박스 */
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
  font-size: 1rem;
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
