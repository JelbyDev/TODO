<template>
  <section>
    <CategoryFormCreate @create="createCategory" />

    <CategoryList
      :categories="categoryList"
      @update="updateCategory"
      @delete="deleteCategory"
    />
  </section>
</template>

<script setup lang="ts">
const {
  categoryList,
  createCategory,
  updateCategory,
  deleteCategory
} = useCategoryListOperations();

</script>

<style scoped>

</style>
