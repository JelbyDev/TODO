<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="category.title"
        :rules="validationRules.title"
        class="mr-4"
        label="Новая категория"
        variant="outlined"
        autocomplete="off"
        density="comfortable"
        clearable
        autofocus
        required
      />
      <v-btn :disabled="!isFormValid" icon="mdi-plus" @click="onSubmit" />
    </div>
  </v-form>
</template>
<script setup lang="ts">
import { Ref } from "vue";
import { Category } from "~~/types";

const { isFormValid, validationRules } = useValidationCategoryForm();
const refForm: Ref<HTMLFormElement | null> = ref(null)

const category: Category = reactive({
  id: Date.now(),
  title: "",
});

const emit = defineEmits<{
  (e: "create", value: Category): void
}>()

function onSubmit(): void {
  if (isFormValid.value) {
    emit("create", category);
    category.title = "";
    nextTick(() => {
      if (refForm.value) { refForm.value.resetValidation() }
    })
  }
}
</script>
