import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'


export default defineConfig({
  plugins: [
    viteStaticCopy({
	  targets: [
	    {
	      src: 'node_modules/@wacom/signature-sdk/signature-sdk.wasm',
		  dest: 'assets'
	    }
      ],	  
	})
  ],  
  esbuild: {
	supported: {
	  'top-level-await': true //browsers can handle top-level-await features
	}
  },
  build: {	
    rollupOptions: {
      input: {
        main: './index.html',
        simple: './simple/index.html',
		complete: './complete/index.html',
		wizard: './wizard/index.html'
      }
    }	
  }
})