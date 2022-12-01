<template>
  <v-list v-if="categories.length">
    <v-list-item
      v-for="category in categories"
      :key="category.id"
      :active="category.id === activeCategoryId"
      @click="onSetActiveCategory(category.id)"
    >
      <div
        class="d-flex justify-space-between align-center"
      >
        <v-list-item-title class="flex-grow-1 pr-5">
          <CategoryFormUpdate
            v-if="categoryIdIsEditingMode === category.id"
            :category-for-update="category"
            @update="onUpdate"
            @keydown.esc="setCategoryIdIsEditingMode(null)"
            @keydown.stop
          />
          <span v-else>{{ category.title }}</span>
        </v-list-item-title>
        <v-list-item-action>
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            @click.stop.prevent="setCategoryIdIsEditingMode(category.id)"
          />
          <v-btn
            icon="mdi-close"
            size="small"
            variant="text"
            @click.stop.prevent="onDelete(category.id)"
          />
        </v-list-item-action>
      </div>
    </v-list-item>
  </v-list>
  <section v-else>
    Список категорий пуст
  </section>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Category } from "@/types";

withDefaults(defineProps<{
  categories: Category[],
  activeCategoryId?: number | null
}>(), {
  categories: () => [],
  activeCategoryId: null
});

const emit = defineEmits<{
  (e: "delete", value: number):void,
  (e: "update", value: Category):void,
  (e: "set-active-category", value: number):void
}>();

const categoryIdIsEditingMode: Ref<number | null> = ref(null);

function setCategoryIdIsEditingMode(categoryId:number | null):void {
  categoryIdIsEditingMode.value = categoryId;
}

function onUpdate(category: Category): void {
  emit("update", category);
  setCategoryIdIsEditingMode(null);
}
function onDelete(categoryId: number): void {
  emit("delete", categoryId);
}
function onSetActiveCategory(categoryId:number):void {
  emit("set-active-category", categoryId)
}
</script>
