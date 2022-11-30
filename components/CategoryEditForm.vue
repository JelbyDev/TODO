<template>
  <form>
    <v-text-field
      v-model="category.title"
      variant="solo"
      append-inner-icon="mdi-pencil"
      autocomplete="off"
      density="compact"
      hide-details
      clearable
      @click:append-inner="runUpdateEmit"
      @click.stop
    />
  </form>
</template>
<script setup lang="ts">
import { Category } from "@/types";

const props = defineProps<{
  categoryForUpdate: Category,
}>();
const emit = defineEmits<{
  (e: "update", value: Category): void
}>()

const category: Category = reactive({ ...props.categoryForUpdate });

function runUpdateEmit(): void {
  emit("update", category);
}
</script>
