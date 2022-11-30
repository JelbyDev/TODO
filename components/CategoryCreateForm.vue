<template>
  <form>
    <v-text-field
      v-model="category.title"
      variant="outlined"
      label="Категория"
      append-inner-icon="mdi-plus-circle-outline"
      autocomplete="off"
      density="compact"
      hide-details
      clearable
      @click:append-inner="runCreateEmit"
      @click.stop
    />
  </form>
</template>
<script setup lang="ts">
import { Category } from "@/types";

const emit = defineEmits<{
  (e: "create", value: Category): void
}>()

const category: Category = reactive({
  id: Date.now(),
  title: ""
});

function runCreateEmit(): void {
  emit("create", category);
}
</script>
