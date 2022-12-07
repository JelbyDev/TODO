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
import { useCategoryStore } from "~~/stores/category";

const emit = defineEmits<{
  (e: "create", value: Task): void;
}>();

const categoryStore = useCategoryStore();

const task: Task = reactive({ ...defaultTask() });
const refForm: Ref<HTMLFormElement | null> = ref(null);
const { isFormValid, validationRules } = useValidationTaskForm();

function defaultTask() {
  return {
    id: Date.now(),
    category_id: categoryStore.activeCategory?.id ?? 0,
    title: "",
    isCompleted: false,
  };
}

function onSubmit(): void {
  if (isFormValid.value) {
    emit("create", task);
    Object.assign(task, { ...defaultTask() });

    nextTick(() => {
      if (refForm.value) {
        refForm.value.resetValidation();
      }
    });
  }
}
</script>
