<template>
  <v-list-item
    :active="category.id === categoryStore.activeCategory?.id"
    @click="categoryStore.activeCategory = category"
  >
    <div class="d-flex justify-space-between align-center">
      <v-list-item-title class="flex-grow-1 pr-5">
        <CategoryFormUpdate
          v-if="categoryIdIsEditingMode === category.id"
          :category-for-update="category"
          @update="updateCategory"
          @blur="updateCategoryIdIsEditingMode(null)"
          @keydown.esc="updateCategoryIdIsEditingMode(null)"
          @keydown.stop
        />
        <span v-else>{{ category.title }}</span>
      </v-list-item-title>
      <v-list-item-action>
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click.stop.prevent="updateCategoryIdIsEditingMode(category.id)"
        />
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          @click.stop.prevent="categoryStore.deleteCategory(category.id)"
        />
      </v-list-item-action>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import { Category } from "@/types";
import { useCategoryStore } from "~~/stores/category";

const categoryStore = useCategoryStore();

withDefaults(
  defineProps<{
    category: Category;
    categoryIdIsEditingMode?: number | null;
  }>(),
  {
    categoryIdIsEditingMode: null,
  }
);

const emits = defineEmits<{
  (e: "update:categoryIdIsEditingMode", categoryId: number | null): void;
}>();

function updateCategoryIdIsEditingMode(categoryId: number | null): void {
  emits("update:categoryIdIsEditingMode", categoryId);
}

function updateCategory(category: Category) {
  categoryStore.updateCategory(category);
  updateCategoryIdIsEditingMode(null);
}
</script>
