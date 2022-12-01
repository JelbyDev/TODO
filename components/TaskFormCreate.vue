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

const { isFormValid, validationRules } = useValidationTaskForm();
const refForm: Ref<HTMLFormElement | null> = ref(null)

const task: Task = reactive({
  id: Date.now(),
  category_id: 0,
  title: "",
  isCompleted: false,
});

const emit = defineEmits<{
  (e: "create", value: Task): void
}>()

function onSubmit(): void {
  if (isFormValid.value) {
    emit("create", task);
    task.title = "";
    nextTick(() => {
      if (refForm.value) { refForm.value.resetValidation() }
    })
  }
}
</script>
