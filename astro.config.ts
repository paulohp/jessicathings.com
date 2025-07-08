import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";

const config = defineConfig({
	site: "https://jessicathings.com",
	output: "static", // Static mode by default
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

// https://astro.build/config
export default defineConfig(config);
