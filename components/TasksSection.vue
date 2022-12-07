<template>
  <section>
    <TaskFormCreate @create="taskStore.createTask" />

    <v-tabs v-model="activeTab" bg-color="transparent" color="basil" grow>
      <v-tab v-for="(tab, index) in tabs" :key="index" :value="tab.value">
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item
        v-for="(tab, index) in tabs"
        :key="index"
        :value="tab.value"
      >
        <TaskList :tasks="tab.tasks" />
      </v-window-item>
    </v-window>
  </section>
</template>

<script setup lang="ts">
import { Ref, ComputedRef } from "vue";
import { TaskTab } from "~~/types";
import { useTaskStore } from "~~/stores/task";

const taskStore = useTaskStore();

const activeTab: Ref<string | null> = ref(null);

const tabs: ComputedRef<TaskTab[]> = computed(() => {
  return [
    {
      title: "Текущие",
      value: "notCompleted",
      tasks: taskStore.notCompletedTaskList,
    },
    {
      title: "Выполненные",
      value: "completed",
      tasks: taskStore.completedTaskList,
    },
  ];
});
</script>
