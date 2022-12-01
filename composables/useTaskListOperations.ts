import { Ref } from "vue";
import { Task } from "~~/types";
import tasks from "~~/moks/tasks"

export default function(params?: {category_id?: number}) {
  const taskList: Ref<Task[]> = ref([]);

  function setTasks() {
    if (params?.category_id) {
      taskList.value = [...tasks.filter((task:Task) => task.category_id === params.category_id)];
    } else {
      taskList.value = [...tasks];
    }
  }

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

  onMounted(() => setTasks());

  return {
    taskList,
    createTask,
    updateTask,
    deleteTask,
    toggleCompletedTask
  }
}
