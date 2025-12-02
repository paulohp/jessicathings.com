import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
	content: ["./src/**/*.{astro,js,ts,tsx,md,mdx}"],
	darkMode: "class",
	theme: {
		extend: {
			// Add webkit prefixes for better iOS support
			supports: {
				"webkit-appearance": {
					"-webkit-appearance": "none",
				},
			},
		},
	},
	plugins: [typography],
	// Ensure proper vendor prefixing for iOS
	corePlugins: {
		preflight: true,
	},
};

export default config;
