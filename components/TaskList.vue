<template>
  <v-list
    v-if="tasks.length"
    variant="outlined"
    density="default"
  >
    <v-list-item
      v-for="task in tasks"
      :key="task.id"
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
            @update="runUpdateEmit"
            @keydown.esc="setTaskIdIsEditingMode(null)"
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
            @click.stop="runCompleteEmit(task.id)"
          />
          <v-btn
            v-if="!task.isCompleted"
            icon="mdi-pencil"
            variant="text"
            size="small"
            color="default"
            @click.stop="setTaskIdIsEditingMode(task.id)"
          />
          <v-btn
            v-if="!task.isCompleted"
            icon="mdi-delete"
            variant="text"
            size="small"
            color="default"
            @click.stop="runDeleteEmit(task.id)"
          />
        </v-list-item-action>
      </div>
    </v-list-item>
  </v-list>
  <section v-else>
    Данный список задач пуст
  </section>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Task } from "@/types";

withDefaults(defineProps<{
  tasks: Task[]
}>(), {
  tasks: () => []
});

const emit = defineEmits<{
  (e: "delete", value: number):void,
  (e: "update", value: Task):void,
  (e: "complete", value: number):void
}>();

const taskIdIsEditingMode: Ref<number | null> = ref(null);

function setTaskIdIsEditingMode(taskId:number | null):void {
  taskIdIsEditingMode.value = taskId;
}

function runCompleteEmit(taskId: number): void {
  emit("complete", taskId);
}
function runUpdateEmit(task: Task): void {
  emit("update", task);
  setTaskIdIsEditingMode(null);
}
function runDeleteEmit(taskId: number): void {
  emit("delete", taskId);
}

</script>
