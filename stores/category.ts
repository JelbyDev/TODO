import { defineStore } from "pinia";
import { Ref } from "vue";
import { Category } from "~~/types";
import { useTaskStore } from "~~/stores/task";
import categories from "~~/moks/categories";

export const useCategoryStore = defineStore("category", () => {
  const taskStore = useTaskStore();

  const categoryList: Ref<Category[]> = ref([...categories]);
  const activeCategory: Ref<Category | null> = ref(categoryList.value[0]);

  function createCategory(category: Category): void {
    categoryList.value.push({ ...category });
    activeCategory.value = categoryList.value.at(-1) ?? null;
  }

  function updateCategory(updatedCategory: Category): void {
    const categoryIndex = categoryList.value.findIndex(
      (category: Category) => category.id === updatedCategory.id
    );
    categoryList.value[categoryIndex] = { ...updatedCategory };
  }

  function deleteCategory(categoryId: number): void {
    categoryList.value = [
      ...categoryList.value.filter(
        (category: Category) => category.id !== categoryId
      ),
    ];
    if (activeCategory.value?.id === categoryId) {
      activeCategory.value = categoryList.value[0] ?? null;
    }
    taskStore.deleteTaskByCategoryId(categoryId);
  }

  return {
    categoryList,
    createCategory,
    updateCategory,
    deleteCategory,
    activeCategory,
  };
});
