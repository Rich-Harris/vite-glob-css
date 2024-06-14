import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		assetsInlineLimit: 0,
		rollupOptions: {
			input: {
				a: 'src/a.js',
				b: 'src/b.js',
				c: 'src/c.js'
			},
			output: {
				assetFileNames: 'assets/[name][extname]',
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name].js'
			}
		},
		manifest: true,
		minify: false,
		target: 'esnext'
	}
});
