<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="task.title"
        :rules="validationRules.title"
        bg-color="#fff"
        variant="outlined"
        autocomplete="off"
        density="compact"
        :append-inner-icon="isFormValid ? 'mdi-content-save-outline' : ''"
        hide-details
        clearable
        autofocus
        required
        @click:append-inner="onSubmit"
      />
    </div>
  </v-form>
</template>
<script setup lang="ts">
import { Ref } from "vue";
import { Task } from "~~/types";

const props = defineProps<{
  taskForUpdate: Task,
}>();

const emit = defineEmits<{
  (e: "update", value: Task): void
}>()

const { isFormValid, validationRules } = useValidationTaskForm();
const refForm: Ref<HTMLFormElement | null> = ref(null)
const task: Task = reactive({ ...props.taskForUpdate });

function onSubmit(): void {
  if (isFormValid.value) {
    emit("update", task);
    task.title = "";
    nextTick(() => {
      if (refForm.value) { refForm.value.resetValidation() }
    })
  }
}
</script>
