<template>
  <v-form ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
    <div class="d-flex">
      <v-text-field
        v-model.trim="category.title"
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
import { Category } from "~~/types";

const props = defineProps<{
  categoryForUpdate: Category,
}>();

const emit = defineEmits<{
  (e: "update", value: Category): void
}>()

const { isFormValid, validationRules } = useValidationCategoryForm();
const refForm: Ref<HTMLFormElement | null> = ref(null)
const category: Category = reactive({ ...props.categoryForUpdate });

function onSubmit(): void {
  if (isFormValid.value) {
    emit("update", category);
    category.title = "";
    nextTick(() => {
      if (refForm.value) { refForm.value.resetValidation() }
    })
  }
}
</script>
