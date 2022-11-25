<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-tabs
          v-model="state.activeTab"
          bg-color="transparent"
          color="basil"
          grow
        >
          <v-tab value="completed"> Текущие задачи </v-tab>
          <v-tab value="notCompleted"> Выполненные задачи </v-tab>
        </v-tabs>

        <v-window v-model="state.activeTab">
          <v-window-item value="completed">
            <task-list :tasks="notCompletedTasks" />
          </v-window-item>

          <v-window-item value="notCompleted">
            <task-list :tasks="completedTasks" />
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>
    <v-footer app>
      <v-container>Подвал</v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from "vue";
import { Task } from "@/types";

// v-input-control-height Найти как поменять высоту

const tasksList: Ref<Task[]> = ref([
  { id: 1, title: "Задача 1", isCompleted: false },
  { id: 2, title: "Задача 2", isCompleted: false },
  { id: 3, title: "Задача 3", isCompleted: false },
  { id: 4, title: "Задача 3", isCompleted: true },
]);

const state = reactive({
  activeTab: null,
});

const completedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => todoItem.isCompleted);
});
const notCompletedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => !todoItem.isCompleted);
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
