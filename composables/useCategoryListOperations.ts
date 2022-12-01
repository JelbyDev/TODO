import { Ref } from "vue";
import { Category } from "~~/types";
import categories from "~~/moks/categories";

export default function() {
  const categoryList: Ref<Category[]> = ref([]);

  function setCategories() {
    categoryList.value = [...categories];
  }

  function createCategory(category: Category): void {
    categoryList.value.push({ ...category });
  }

  function updateCategory(updatedCategory: Category): void {
    const categoryIndex = categoryList.value.findIndex(
      (category: Category) => category.id === updatedCategory.id
    );
    categoryList.value[categoryIndex] = { ...updatedCategory };
  }

  function deleteCategory(categoryId: number): void {
    categoryList.value = [
      ...categoryList.value.filter((category: Category) => category.id !== categoryId),
    ];
  }
  onMounted(() => {
    setCategories();
  })

  return {
    categoryList,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
