<template>
  <section>
    <CategoryFormCreate @create="categoryStore.createCategory" />

    <CategoryList
      :categories="categoryStore.categoryList"
      :active-category-id="categoryStore.activeCategory"
      @update="categoryStore.updateCategory"
      @delete="categoryStore.deleteCategory"
      @set-active-category="categoryStore.setActiveCategory"
    />
  </section>
</template>

<script setup lang="ts">
import { useCategoryStore } from "~~/stores/category";

const categoryStore = useCategoryStore();
</script>

<style scoped>

</style>
