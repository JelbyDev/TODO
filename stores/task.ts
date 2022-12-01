import { defineStore } from "pinia";
import { Ref, ComputedRef } from "vue";
import { Task } from "~~/types";
import tasks from "~~/moks/tasks";

export const useTaskStore = defineStore("task", () => {
  const taskList: Ref<Task[]> = ref([...tasks]);
  const taskFilters: {category_id: number | string | null} = reactive({
    category_id: null
  });

  function createTask(task: Task): void {
    taskList.value.push({ ...task });
  }

  function updateTask(updatedTask: Task): void {
    const taskIndex = taskList.value.findIndex(
      (task: Task) => task.id === updatedTask.id
    );
    taskList.value[taskIndex] = { ...updatedTask }
  }

  function deleteTask(taskId: number): void {
    taskList.value = [
      ...taskList.value.filter((task: Task) => task.id !== taskId),
    ];
  }

  function toggleCompletedTask(taskId: number):void {
    const taskIndex = taskList.value.findIndex(
      (task: Task) => task.id === taskId
    );
    taskList.value[taskIndex].isCompleted = !taskList.value[taskIndex].isCompleted;
  }

  const filteredTaskList: ComputedRef<Task[]> = computed(() => {
    if (taskFilters.category_id) {
      return [...taskList.value.filter(
        (task: Task) => task.id === taskFilters.category_id
      )];
    } else {
      return [...taskList.value];
    }
  });

  function setTaskFilters(key: keyof typeof taskFilters, value: number | string | null) {
    taskFilters[key] = value;
  }

  return {
    filteredTaskList,
    createTask,
    updateTask,
    deleteTask,
    toggleCompletedTask,
    setTaskFilters,
  }
});
