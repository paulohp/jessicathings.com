import { z, defineCollection } from "astro:content";

const blogsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.union([z.string(), z.date()]), // Accept either string or Date
			excerpt: z.string().optional(),
			slug: z.string().optional(), // Make optional since Astro can derive from filename
			categories: z.union([z.array(z.string()), z.string(), z.null()]).optional(), // Accept array, string, or null
			tags: z.array(z.string()).optional(),
			thumbnail: z.string().optional(), // URL string for external images
			// Keep ogImage for backward compatibility, but make it optional
			ogImage: image().optional(),
			// Add description for backward compatibility, make optional
			description: z.string().optional(),
		}),
});

const galleryCollection = defineCollection({
	type: "content",
	schema: z.object({
		image: z.string(),
		images: z.array(z.string()).optional(),
		alt: z.string().default(""),
		caption: z.string().optional(),
		type: z.enum(["photo", "video"]).default("photo"),
		videoSrc: z.string().optional(),
		width: z.number().optional(),
		height: z.number().optional(),
		date: z.string().optional(),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = {
	blog: blogsCollection,
	gallery: galleryCollection,
};
