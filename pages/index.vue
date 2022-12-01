<template>
  <v-app>
    <v-app-bar color="headerBg">
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <div class="text-h5 mb-2">
          Список задач
        </div>
        <TasksSection />
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.v-container {
  max-width: 960px;
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
