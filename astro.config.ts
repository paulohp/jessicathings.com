import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import cloudflare from "@astrojs/cloudflare";
import vercel from "@astrojs/vercel";

const config = defineConfig({
	site: "https://jessicathings-com.vercel.app/",
	output: "static",
	adapter: vercel({
		webAnalytics: { enabled: true }
	}),
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
	],
});

// https://astro.build/config
export default defineConfig(config);
