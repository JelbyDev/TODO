<template>
  <v-list v-if="categories.length">
    <CategoryListItem
      v-for="category in categories"
      :key="category.id"
      v-model:category-id-is-editing-mode="categoryIdIsEditingMode"
      :category="category"
    />
  </v-list>
  <div v-else class="font-weight-bold py-3">Список категорий пуст</div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Category } from "@/types";

withDefaults(
  defineProps<{
    categories: Category[];
  }>(),
  {
    categories: () => [],
  }
);

const categoryIdIsEditingMode: Ref<number | null> = ref(null);
</script>
