<template>
  <section>
    <TaskFormCreate @create="createTask" />

    <v-tabs
      v-model="activeTab"
      bg-color="transparent"
      color="basil"
      grow
    >
      <v-tab v-for="(tab, index) in tabs" :key="index" :value="tab.value">
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item v-for="(tab, index) in tabs" :key="index" :value="tab.value">
        <TaskList
          :tasks="tab.tasks"
          @complete="toggleCompletedTask"
          @update="updateTask"
          @delete="deleteTask"
        />
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup lang="ts">
import { Ref, ComputedRef } from "vue";
import { Task, TaskTab } from "@/types";

const activeTab: Ref<string | null> = ref(null);
const {
  taskList,
  createTask,
  updateTask,
  deleteTask,
  toggleCompletedTask
} = useTaskListOperations();

const completedTaskList: ComputedRef<Task[]> = computed(() => {
  return taskList.value.filter(
    (task: Task) =>
      task.isCompleted
  );
});

const notCompletedTaskList: ComputedRef<Task[]> = computed(() => {
  return taskList.value.filter(
    (task: Task) =>
      !task.isCompleted
  );
});

const tabs: ComputedRef<TaskTab[]> = computed(() => {
  return [
    { title: "Текущие", value: "notCompleted", tasks: notCompletedTaskList.value },
    { title: "Выполненные", value: "completed", tasks: completedTaskList.value }
  ]
});

</script>

<style lang="scss">
.v-container {
  max-width: 960px;
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
