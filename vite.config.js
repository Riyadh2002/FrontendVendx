import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:"0.0.0.0",
    port:3000,
    proxy: {
      '/api': {
        //basar wifi     192.168.0.115
        //iphone         172.20.10.5
        target: 'http://172.20.10.5:5000',
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

})
