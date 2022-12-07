<template>
  <section>
    <CategoryFormCreate @create="categoryStore.createCategory" />

    <CategoryList :categories="categoryStore.categoryList" />
  </section>
</template>

<script setup lang="ts">
import { useCategoryStore } from "~~/stores/category";

const categoryStore = useCategoryStore();
</script>

<style scoped></style>
