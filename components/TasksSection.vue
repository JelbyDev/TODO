<template>
  <section>
    <TaskFormCreate @create="createTask" />

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
import { Task, TaskTab } from "~~/types";
import { useTaskStore } from "~~/stores/task";
import { useCategoryStore } from "~~/stores/category";

const taskStore = useTaskStore();
const categoryStore = useCategoryStore();

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

function createTask(task: Task): void {
  if (!task.category_id && categoryStore.activeCategory) {
    task.category_id = categoryStore.activeCategory.id;
  }
  taskStore.createTask(task);
  activeTab.value = "notCompleted";
}
</script>
