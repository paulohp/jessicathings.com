module.exports = {
	plugins: [
		require("tailwindcss"),
		require("autoprefixer")({
			overrideBrowserslist: ["iOS >= 12", "Safari >= 12", "last 2 versions", "> 1%", "not dead"],
			grid: "autoplace",
			flexbox: "no-2009",
		}),
	],
};
