<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="task.title"
        :rules="validationRules.title"
        :append-inner-icon="isFormValid ? 'mdi-content-save-outline' : ''"
        label="Новая задача"
        variant="outlined"
        autocomplete="off"
        density="comfortable"
        clearable
        @click:append-inner="onSubmit"
      />
    </div>
  </v-form>
</template>
<script setup lang="ts">
import { Ref } from "vue";
import { Task } from "~~/types";

const emits = defineEmits<{
  (e: "create", value: Task): void;
}>();

const task: Ref<Task> = ref({ ...getDefaultTask() });
const refForm: Ref<HTMLFormElement | null> = ref(null);
const { isFormValid, validationRules } = useValidationTaskForm();

function getDefaultTask() {
  return {
    id: Date.now(),
    category_id: 0,
    title: "",
    isCompleted: false,
  };
}

function onSubmit(): void {
  if (isFormValid.value) {
    emits("create", task.value);
    task.value = { ...getDefaultTask() };

    nextTick(() => {
      if (refForm.value) {
        refForm.value.resetValidation();
      }
    });
  }
}
</script>
