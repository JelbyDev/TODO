import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            info: "#2196f3",
            error: "#b00020",
            success: "#4caf50",
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
