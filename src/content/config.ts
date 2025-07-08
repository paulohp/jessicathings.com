import { z, defineCollection } from "astro:content";

const blogsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			date: z.string(), // Keep as string to match existing posts
			excerpt: z.string().optional(),
			slug: z.string().optional(), // Make optional since Astro can derive from filename
			categories: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional(),
			thumbnail: z.string().optional(), // URL string for external images
			// Keep ogImage for backward compatibility, but make it optional
			ogImage: image().optional(),
			// Add description for backward compatibility, make optional
			description: z.string().optional(),
		}),
});

export const collections = {
	blog: blogsCollection,
};
