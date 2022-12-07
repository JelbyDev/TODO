<template>
  <v-list-item
    :active="task.isCompleted || taskIdIsEditingMode === task.id"
    :active-color="task.isCompleted ? 'success' : ''"
    class="mb-2 rounded"
    @keydown.stop
    @click.stop
  >
    <div class="d-flex justify-space-between align-center">
      <v-list-item-title class="flex-grow-1 pr-5">
        <TaskFormUpdate
          v-if="taskIdIsEditingMode === task.id"
          :task-for-update="task"
          @update="updateTask"
          @keydown.esc="updateTaskIdIsEditingMode(null)"
          @keydown.stop
        />
        <span v-else>{{ task.title }}</span>
      </v-list-item-title>

      <v-list-item-action>
        <v-btn
          :color="task.isCompleted ? 'success' : ''"
          icon="mdi-check-bold"
          variant="text"
          size="small"
          @click.stop="taskStore.toggleCompletedTask(task.id)"
        />
        <v-btn
          v-if="!task.isCompleted"
          icon="mdi-pencil"
          variant="text"
          size="small"
          color="default"
          @click.stop="updateTaskIdIsEditingMode(task.id)"
        />
        <v-btn
          v-if="!task.isCompleted"
          icon="mdi-delete"
          variant="text"
          size="small"
          color="default"
          @click.stop="taskStore.deleteTask(task.id)"
        />
      </v-list-item-action>
    </div>
  </v-list-item>
</template>

<script setup lang="ts">
import { Task } from "~~/types";
import { useTaskStore } from "~~/stores/task";

const taskStore = useTaskStore();

withDefaults(
  defineProps<{
    task: Task;
    taskIdIsEditingMode?: number | null;
  }>(),
  {
    taskIdIsEditingMode: null,
  }
);

const emits = defineEmits<{
  (e: "update:taskIdIsEditingMode", taskId: number | null): void;
}>();

function updateTaskIdIsEditingMode(taskId: number | null): void {
  emits("update:taskIdIsEditingMode", taskId);
}

function updateTask(task: Task) {
  taskStore.updateTask(task);
  updateTaskIdIsEditingMode(null);
}
</script>
