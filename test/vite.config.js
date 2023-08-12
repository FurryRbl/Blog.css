import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	base: "/",
	server: {
		host: true,
		port: 8888,
		strictPort: true,
	},
});
