import { defineStore } from "pinia";
import { Ref, ComputedRef } from "vue";
import { Task, TaskFilters } from "~~/types";
import { useCategoryStore } from "~~/stores/category";
import tasks from "~~/moks/tasks";

export const useTaskStore = defineStore("task", () => {
  const categoryStore = useCategoryStore();

  const taskList: Ref<Task[]> = ref([...tasks]);

  function createTask(task: Task): void {
    taskList.value.push({ ...task });
  }

  function updateTask(updatedTask: Task): void {
    const taskIndex = taskList.value.findIndex(
      (task: Task) => task.id === updatedTask.id
    );
    taskList.value[taskIndex] = { ...updatedTask };
  }

  function deleteTask(taskId: number): void {
    taskList.value = [
      ...taskList.value.filter((task: Task) => task.id !== taskId),
    ];
  }

  function deleteTaskByCategoryId(categoryId: number): void {
    taskList.value = [
      ...taskList.value.filter((task: Task) => task.category_id !== categoryId),
    ];
  }

  function toggleCompletedTask(taskId: number): void {
    const taskIndex = taskList.value.findIndex(
      (task: Task) => task.id === taskId
    );
    taskList.value[taskIndex].isCompleted =
      !taskList.value[taskIndex].isCompleted;
  }

  const taskFilters: ComputedRef<TaskFilters> = computed(() => {
    return {
      category_id: categoryStore.activeCategory?.id ?? null,
    };
  });

  const filteredTaskList: ComputedRef<Task[]> = computed(() => {
    if (taskFilters.value.category_id) {
      return [
        ...taskList.value.filter(
          (task: Task) => task.category_id === taskFilters.value.category_id
        ),
      ];
    } else {
      return [...taskList.value];
    }
  });

  const completedTaskList: ComputedRef<Task[]> = computed(() => {
    return filteredTaskList.value.filter((task: Task) => task.isCompleted);
  });

  const notCompletedTaskList: ComputedRef<Task[]> = computed(() => {
    return filteredTaskList.value.filter((task: Task) => !task.isCompleted);
  });

  return {
    createTask,
    updateTask,
    deleteTask,
    deleteTaskByCategoryId,
    toggleCompletedTask,
    completedTaskList,
    notCompletedTaskList,
  };
});
