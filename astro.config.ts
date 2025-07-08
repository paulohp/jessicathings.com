import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

const config = defineConfig({
	site: "https://example.com",
	output: "server",
	adapter: vercel(),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

// https://astro.build/config
export default defineConfig(config);
