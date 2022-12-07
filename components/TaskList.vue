<template>
  <v-list v-if="tasks.length" variant="outlined" density="default">
    <TaskListItem
      v-for="task in tasks"
      :key="task.id"
      v-model:task-id-is-editing-mode="taskIdIsEditingMode"
      :task="task"
    />
  </v-list>
  <div v-else class="font-weight-bold py-5">Список задач пуст</div>
</template>

<script setup lang="ts">
import { Task } from "~~/types";

withDefaults(
  defineProps<{
    tasks: Task[];
  }>(),
  {
    tasks: () => [],
  }
);

const taskIdIsEditingMode: Ref<number | null> = ref(0);
</script>
