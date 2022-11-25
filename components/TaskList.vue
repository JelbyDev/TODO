<template>
  <v-expansion-panels v-if="tasks.length" variant="accordion">
    <v-expansion-panel v-for="task in tasks" :key="task.id">
      <v-expansion-panel-title>
        <div class="d-flex align-center">
          <v-checkbox
            v-model="task.isCompleted"
            color="success"
            hide-details
            density="compact"
          />
          {{ task.title }}
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        {{ task.text }}
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <div v-else>Данный список пуст</div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { Task } from "@/types";

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
    default: () => [],
  },
});
</script>
