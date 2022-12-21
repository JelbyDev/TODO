import { Ref } from "vue";

export default function() {
  const isFormValid: Ref<boolean> = ref(false);
  const validationRules = {
    title: [
      (v: string): boolean | string => !!v || "Поле обязательно к заполнению",
    ],
  };

  return {
    isFormValid,
    validationRules
  }
}
