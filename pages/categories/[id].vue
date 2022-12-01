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

<script setup lang="ts">
</script>

<style scoped>

</style>
