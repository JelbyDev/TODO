// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/TODO/",
    buildAssetsDir: "assets/",
    head: {
      title: "TODO List",
      meta: [
        {
          name: "description",
          content:
            "Удобный TODO List с возможность разбивки задач по категориям.",
        },
      ],
    },
  },
  ssr: false,
  typescript: {
    shim: false,
  },
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  modules: ["@pinia/nuxt"],
});
