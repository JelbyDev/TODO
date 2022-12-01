<template>
  <section>
    <TaskFormCreate @create="taskStore.createTask" />

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
          @complete="taskStore.toggleCompletedTask"
          @update="taskStore.updateTask"
          @delete="taskStore.deleteTask"
        />
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup lang="ts">
import { Ref, ComputedRef } from "vue";
import { Task, TaskTab } from "~~/types";
import { useTaskStore } from "~~/stores/task";

const taskStore = useTaskStore();

const completedTaskList: ComputedRef<Task[]> = computed(() => {
  return taskStore.filteredTaskList.filter(
    (task: Task) =>
      task.isCompleted
  );
});

const notCompletedTaskList: ComputedRef<Task[]> = computed(() => {
  return taskStore.filteredTaskList.filter(
    (task: Task) =>
      !task.isCompleted
  );
});

const activeTab: Ref<string | null> = ref(null);

const tabs: ComputedRef<TaskTab[]> = computed(() => {
  return [
    { title: "Текущие", value: "notCompleted", tasks: notCompletedTaskList.value },
    { title: "Выполненные", value: "completed", tasks: completedTaskList.value }
  ]
});

</script>

<style lang="scss"></style>
