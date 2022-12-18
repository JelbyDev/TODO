<template>
  <v-app>
    <v-app-bar color="headerBg">
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="pt-1">
          <v-col class="mt-2" cols="12" md="5">
            <div class="text-h5 pb-2">Категории</div>
            <CategoriesSection />
          </v-col>
          <v-col class="mt-2" cols="12" md="7">
            <div class="text-h5 pb-2">Задачи</div>
            <TasksSection />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<style lang="scss" scoped>
.v-container {
  max-width: 960px;
  min-width: 320px;
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
