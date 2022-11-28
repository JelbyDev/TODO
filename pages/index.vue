<template>
  <v-app>
    <v-app-bar color="headerBg">
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="5">
            <div class="text-h5 mb-2">Категории</div>
            <form>
              <v-text-field
                label="Категория"
                autocomplete="off"
                variant="outlined"
                density="compact"
                append-inner-icon="mdi-plus-circle-outline"
                hide-details
                clearable
              />
            </form>
            <div>
              <v-list>
                <v-list-item
                  v-for="category in categoryList"
                  :key="category.id"
                  :active="category.id === activeCategoryId"
                  @click="changeActiveCategory(category.id)"
                >
                  <v-list-item-content
                    class="d-flex justify-space-between align-center"
                  >
                    <v-list-item-title>
                      <span v-if="editingCategoryId === category.id">
                        Редактируем
                      </span>
                      <span v-else>
                        {{ category.title }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-action>
                      <v-btn
                        icon="mdi-pencil"
                        size="small"
                        variant="text"
                        @click.stop="changeEditingCategoryId(category.id)"
                      />
                      <v-btn
                        icon="mdi-close"
                        size="small"
                        variant="text"
                        @click.stop
                      />
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </div>
          </v-col>
          <v-col cols="7">
            <div class="text-h5 mb-2">Задачи</div>
            <form>
              <v-text-field
                label="Задача"
                autocomplete="off"
                variant="outlined"
                density="compact"
                append-inner-icon="mdi-plus-circle-outline"
                hide-details
                clearable
              />
            </form>
            <v-tabs
              v-model="activeTab"
              bg-color="transparent"
              color="basil"
              grow
            >
              <v-tab value="notCompleted"> Текущие </v-tab>
              <v-tab value="completed"> Выполненные </v-tab>
            </v-tabs>

            <v-window v-model="activeTab">
              <v-window-item value="notCompleted">
                <TaskList
                  :tasks="notCompletedTasks"
                  @delete="deleteTask"
                  @update="showUpdateTaskModal"
                />
              </v-window-item>

              <v-window-item value="completed">
                <TaskList :tasks="completedTasks" @delete="deleteTask" />
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>

        <hr />

        <v-btn
          prepend-icon="mdi-plus"
          color="info"
          @click="showCreateTaskModal"
        >
          Добавить
        </v-btn>

        <v-dialog
          v-model="isShowTaskCreateModal"
          max-width="720"
          min-width="320"
        >
          <v-card>
            <v-card-title>
              <div class="text-h5">Новая задача</div>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-text-field
                  v-model="modalTask.title"
                  autocomplete="off"
                  label="Задача*"
                  variant="outlined"
                  clearable
                  required
                />
                <v-textarea
                  v-model="modalTask.text"
                  autocomplete="off"
                  label="Дополнительное описание"
                  variant="outlined"
                  clearable
                />
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="outlined" color="info" @click="hideTaskModal">
                Отмена
              </v-btn>
              <v-btn
                v-if="modalTask.id"
                variant="outlined"
                color="info"
                @click="updateTask"
              >
                Сохранить
              </v-btn>
              <v-btn v-else variant="outlined" color="info" @click="createTask">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from "vue";
import { Task, TaskCategory } from "@/types";

// v-input-control-height Найти как поменять высоту
const activeCategoryId: Ref<number | null> = ref(null);
const editingCategoryId: Ref<number> = ref(0);
const editingTaskId: Ref<number> = ref(0);

const categoryList: Ref<TaskCategory[]> = ref([
  { id: 1, title: "Срочное" },
  { id: 2, title: "Покупки" },
]);
activeCategoryId.value = categoryList.value[0].id;

const taskList: Ref<Task[]> = ref([
  { id: 1, title: "Задача 1", category_id: 1, isCompleted: false },
  { id: 2, title: "Задача 2", category_id: 1, isCompleted: false },
  { id: 3, title: "Задача 3", category_id: 2, isCompleted: false },
  { id: 4, title: "Задача 4", category_id: 1, isCompleted: true },
]);

function changeActiveCategory(categoryId: number): void {
  activeCategoryId.value = categoryId;
}

function changeEditingCategoryId(categoryId: number): void {
  editingCategoryId.value = categoryId;
}

function changeEditingTaskId(taskId: number): void {
  editingTaskId.value = taskId;
}

const activeTab: Ref<string | null> = ref(null);
const isShowTaskCreateModal: Ref<boolean> = ref(false);

const completedTasks: ComputedRef<Task[]> = computed(() => {
  return taskList.value.filter(
    (task: Task) =>
      task.isCompleted && activeCategoryId.value === task.category_id
  );
});

const notCompletedTasks: ComputedRef<Task[]> = computed(() => {
  return taskList.value.filter(
    (task: Task) =>
      !task.isCompleted && activeCategoryId.value === task.category_id
  );
});

const modalTask: Task = reactive({
  id: 0,
  title: "",
  text: "",
  category_id: 0,
  isCompleted: false,
});

watch(isShowTaskCreateModal, () => {
  if (isShowTaskCreateModal.value === false) {
    modalTask.id = 0;
    modalTask.title = "";
    modalTask.text = "";
    modalTask.isCompleted = false;
  }
});

function hideTaskModal() {
  isShowTaskCreateModal.value = false;
}

function showCreateTaskModal(): void {
  isShowTaskCreateModal.value = true;
}

function showUpdateTaskModal(taskId: number): void {
  const updatingTask = taskList.value.find((task: Task) => task.id === taskId);
  if (updatingTask) {
    modalTask.id = updatingTask.id;
    modalTask.title = updatingTask.title;
    modalTask.text = updatingTask.text;
  }
  isShowTaskCreateModal.value = true;
}

function createTask(): void {
  modalTask.id = Date.now();
  taskList.value.push({ ...modalTask });
  hideTaskModal();
}

function updateTask(): void {
  const updateTaskIndex = taskList.value.findIndex(
    (task: Task) => task.id === modalTask.id
  );
  taskList.value[updateTaskIndex] = { ...modalTask };
  hideTaskModal();
}

function deleteTask(taskId: number): void {
  taskList.value = [
    ...taskList.value.filter((task: Task) => task.id !== taskId),
  ];
}
</script>

<style lang="scss">
.v-container {
  max-width: 960px;
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
