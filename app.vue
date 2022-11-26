<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <h1 class="mb-7">Список задач</h1>
        <v-tabs
          v-model="state.activeTab"
          bg-color="transparent"
          color="basil"
          grow
        >
          <v-tab value="completed"> Текущие </v-tab>
          <v-tab value="notCompleted"> Выполненные </v-tab>
        </v-tabs>

        <v-window v-model="state.activeTab">
          <v-window-item value="completed">
            <task-list :tasks="notCompletedTasks" @delete="deleteTask" />
          </v-window-item>

          <v-window-item value="notCompleted">
            <task-list :tasks="completedTasks" @delete="deleteTask" />
          </v-window-item>
        </v-window>

        <v-btn
          prepend-icon="mdi-plus"
          color="info"
          @click="state.isShowTaskCreateModal = true"
        >
          Добавить
        </v-btn>

        <v-dialog
          v-model="state.isShowTaskCreateModal"
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
                  v-model="newTask.title"
                  label="Задача*"
                  variant="outlined"
                  clearable
                  required
                />
                <v-textarea
                  v-model="newTask.text"
                  label="Дополнительное описание"
                  variant="outlined"
                  clearable
                />
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                variant="outlined"
                color="info"
                @click="state.isShowTaskCreateModal = false"
              >
                Отмена
              </v-btn>
              <v-btn variant="outlined" color="info" @click="createTask">
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
    <v-footer app>
      <v-container>Подвал</v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { Ref, ComputedRef } from "vue";
import { Task } from "@/types";

// v-input-control-height Найти как поменять высоту

const tasksList: Ref<Task[]> = ref([
  { id: 1, title: "Задача 1", isCompleted: false },
  { id: 2, title: "Задача 2", isCompleted: false },
  { id: 3, title: "Задача 3", isCompleted: false },
  { id: 4, title: "Задача 4", isCompleted: true },
]);

const newTask: Task = reactive({
  id: 0,
  title: "",
  text: "",
  isCompleted: false,
});

function createTask(): void {
  tasksList.value.push(newTask);
  state.isShowTaskCreateModal = false;
}

function deleteTask(taskId: number): void {
  tasksList.value = [
    ...tasksList.value.filter((task: Task) => task.id !== taskId),
  ];
}

const state = reactive({
  activeTab: null,
  isShowTaskCreateModal: false,
});

const completedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => todoItem.isCompleted);
});
const notCompletedTasks: ComputedRef<Task[]> = computed(() => {
  return tasksList.value.filter((todoItem: Task) => !todoItem.isCompleted);
});
</script>

<style lang="scss">
.v-container {
  max-width: 960px;
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
