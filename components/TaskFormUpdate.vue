<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="task.title"
        :rules="validationRules.title"
        :append-inner-icon="isFormValid ? 'mdi-content-save-outline' : ''"
        bg-color="#fff"
        variant="outlined"
        autocomplete="off"
        density="compact"
        hide-details
        clearable
        autofocus
        @blur="onBlur"
        @click:append-inner="onSubmit"
      />
    </div>
  </v-form>
</template>
<script setup lang="ts">
import { Ref } from "vue";
import { Task } from "~~/types";

const props = defineProps<{
  taskForUpdate: Task;
}>();

const emits = defineEmits<{
  (e: "update", value: Task): void;
  (e: "blur"): void;
}>();

const { isFormValid, validationRules } = useValidationTaskForm();
const refForm: Ref<HTMLFormElement | null> = ref(null);
const task: Ref<Task> = ref({ ...props.taskForUpdate });

function onSubmit(): void {
  if (isFormValid.value) {
    emits("update", task.value);
    task.value.title = "";

    nextTick(() => {
      if (refForm.value) {
        refForm.value.resetValidation();
      }
    });
  }
}

function onBlur() {
  emits("blur");
}
</script>
