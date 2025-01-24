import { defineStore } from "pinia";

export const useDetectedItemsStore = defineStore("detectedItems", {
  state: () => ({
    items: [], // 감지된 항목 저장
  }),
  actions: {
    setItems(newItems) {
      this.items = newItems;
    },
    clearItems() {
      this.items = [];
    },
  },
});
