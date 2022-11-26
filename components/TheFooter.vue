<template>
  <v-footer app color="footerBg">
    <v-container class="pa-1">
      <div class="text-center mb-1">
        <v-btn
          target="_blank"
          prepend-icon="mdi-github"
          variant="text"
          href="https://github.com/JelbyDev/TODO"
        >
          TODO list
        </v-btn>
      </div>

      <div class="d-flex justify-center flex-wrap">
        <div
          v-for="(technology, index) in technologyList"
          :key="index"
          class="pa-1"
        >
          {{ technology }}
        </div>
      </div>

      <div class="text-center mt-3">© 2022</div>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
const technologyList = ["Vue 3 (Nuxt)", "Vuetify", "TypeScript"];
</script>
