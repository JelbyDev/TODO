<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="category.title"
        :rules="validationRules.title"
        :append-inner-icon="isFormValid ? 'mdi-content-save-outline' : ''"
        label="Новая категория"
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
import { Category } from "~~/types";

const emits = defineEmits<{
  (e: "create", value: Category): void;
}>();

const { isFormValid, validationRules } = useValidationCategoryForm();
const refForm: Ref<HTMLFormElement | null> = ref(null);
const category: Ref<Category> = ref({ ...getDefaultCategory() });

function getDefaultCategory() {
  return {
    id: Date.now(),
    title: "",
  };
}

function onSubmit(): void {
  if (isFormValid.value) {
    emits("create", category.value);
    category.value = { ...getDefaultCategory() };

    nextTick(() => {
      if (refForm.value) {
        refForm.value.resetValidation();
      }
    });
  }
}
</script>
