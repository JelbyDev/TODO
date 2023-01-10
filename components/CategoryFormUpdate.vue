<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="category.title"
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
import { Category } from "~~/types";

const props = defineProps<{
  categoryForUpdate: Category;
}>();

const emits = defineEmits<{
  (e: "update", value: Category): void;
  (e: "blur"): void;
}>();

const { isFormValid, validationRules } = useValidationCategoryForm();
const refForm: Ref<HTMLFormElement | null> = ref(null);
const category: Ref<Category> = ref({ ...props.categoryForUpdate });

function onSubmit(): void {
  if (isFormValid.value) {
    emits("update", category.value);
    category.value.title = "";

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
