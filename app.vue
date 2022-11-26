<template>
  <v-app>
    <v-app-bar color="headerBg">
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1 class="mb-7">Список задач</h1>
        <v-tabs v-model="activeTab" bg-color="transparent" color="basil" grow>
          <v-tab value="completed"> Текущие </v-tab>
          <v-tab value="notCompleted"> Выполненные </v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <v-window-item value="completed">
            <task-list
              :tasks="notCompletedTasks"
              @delete="deleteTask"
              @update="showUpdateTaskModal"
            />
          </v-window-item>

          <v-window-item value="notCompleted">
            <task-list :tasks="completedTasks" @delete="deleteTask" />
          </v-window-item>
        </v-window>

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
import { Task } from "@/types";

// v-input-control-height Найти как поменять высоту

const activeTab: Ref<string | null> = ref(null);
const isShowTaskCreateModal: Ref<boolean> = ref(false);

const tasksList: Ref<Task[]> = ref([
  { id: 1, title: "Задача 1", isCompleted: false },
  { id: 2, title: "Задача 2", isCompleted: false },
  { id: 3, title: "Задача 3", isCompleted: false },
  { id: 4, title: "Задача 4", isCompleted: true },
]);
const completedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => todoItem.isCompleted);
});
const notCompletedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => !todoItem.isCompleted);
});

const modalTask: Task = reactive({
  id: 0,
  title: "",
  text: "",
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
  const updatingTask = tasksList.value.find((task: Task) => task.id === taskId);
  if (updatingTask) {
    modalTask.id = updatingTask.id;
    modalTask.title = updatingTask.title;
    modalTask.text = updatingTask.text;
  }
  isShowTaskCreateModal.value = true;
}

function createTask(): void {
  modalTask.id = Date.now();
  tasksList.value.push({ ...modalTask });
  hideTaskModal();
}

function updateTask(): void {
  const updateTaskIndex = tasksList.value.findIndex(
    (task: Task) => task.id === modalTask.id
  );
  tasksList.value[updateTaskIndex] = { ...modalTask };
  hideTaskModal();
}

function deleteTask(taskId: number): void {
  tasksList.value = [
    ...tasksList.value.filter((task: Task) => task.id !== taskId),
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
