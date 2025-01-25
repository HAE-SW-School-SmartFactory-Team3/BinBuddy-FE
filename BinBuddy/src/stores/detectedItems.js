import { defineStore } from "pinia";

export const useDetectedItemsStore = defineStore("detectedItems", {
  state: () => ({
    items: [],
    guidelines: {}, // guidelines 추가
  }),
  actions: {
    setItems(newItems) {
      this.items = newItems;
    },
    setGuidelines(newGuidelines) {
      this.guidelines = newGuidelines;
    },
  },
});
