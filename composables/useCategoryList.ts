import { Ref } from "vue";
import { Category } from "@/types";

export function useCategoryList() {
  const categoryList: Ref<Category[]> = ref([]);
  const editingCategoryId: Ref<number> = ref(0);
  const activeCategoryId: Ref<number> = ref(0);

  function loadCategoryList() {
    categoryList.value = [
      { id: 1, title: "Срочное" },
      { id: 2, title: "Покупки" },
    ];
    activeCategoryId.value = categoryList.value[0].id;
  }

  function createCategory(category: Category): void {
    categoryList.value.push({ ...category });
  }

  function updateCategory(updatedCategory: Category): void {
    const updateCategoryIndex = categoryList.value.findIndex(
      (category: Category) => category.id === updatedCategory.id
    );
    categoryList.value[updateCategoryIndex] = { ...updatedCategory };
    editingCategoryId.value = 0;
  }

  function deleteCategory(categoryId: number/*, taskList:Ref<Task[]> */): void {
    categoryList.value = [
      ...categoryList.value.filter((category: Category) => category.id !== categoryId),
    ];
    /* taskList.value = [
      ...taskList.value.filter((task: Task) => task.category_id !== categoryId),
    ]; */
  }

  function changeActiveCategory(categoryId: number): void {
    activeCategoryId.value = categoryId;
  }

  function changeEditingCategoryId(categoryId: number): void {
    editingCategoryId.value = categoryId;
  }

  onMounted(() => {
    loadCategoryList();
  })

  return {
    categoryList,
    editingCategoryId,
    activeCategoryId,
    createCategory,
    updateCategory,
    deleteCategory,
    changeActiveCategory,
    changeEditingCategoryId
  }
}
