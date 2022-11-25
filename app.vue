<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-app-bar-title>TODO List</v-app-bar-title>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>Контентная часть</v-container>
    </v-main>
    <v-footer app>
      <v-container>Подвал</v-container>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
.v-container {
  max-width: 960px;
}
</style>
