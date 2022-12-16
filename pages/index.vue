<template>
  <v-app>
    <v-app-bar color="headerBg">
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row class="pt-3">
          <v-col cols="5">
            <CategoriesSection />
          </v-col>
          <v-col cols="7">
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
}
.v-window {
  padding: 1rem 0.4rem 0.4rem;
}
</style>
