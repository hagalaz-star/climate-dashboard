<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> 5726d96 (update)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
<<<<<<< HEAD
      '/api': {
        target: 'https://cckpapi.worldbank.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
=======
      "/api": {
        target: "https://cckpapi.worldbank.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
>>>>>>> 5726d96 (update)
