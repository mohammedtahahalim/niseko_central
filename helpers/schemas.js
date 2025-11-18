import z from "zod";

export const bookingsSchema = z.object({
  id: z.number(),
  images: z.string().nonempty(),
  blurred_images: z.string().nonempty(),
  max_pax: z.number().nonnegative(),
  lifts_distance: z.number(),
  price: z.number(),
  size: z.number(),
  beds: z.number(),
  translations: z.object({
    en: z.object({
      type: z.string(),
      title: z.string(),
    }),
    ja: z.object({
      type: z.string(),
      title: z.string(),
    }),
    fr: z.object({
      type: z.string(),
      title: z.string(),
    }),
    ar: z.object({
      type: z.string(),
      title: z.string(),
    }),
  }),
});

export const articleSchema = z.object({
  category: z.string(),
  deals: z.array(
    z.object({
      id: z.number(),
      image: z.string(),
      title: z.string(),
      subtitle: z.string(),
      content: z.string(),
      blur_image: z.string(),
    })
  ),
});

export const propertySchema = z.object({
  id: z.number().nonnegative(),
  map: z.string(),
  images: z.string(),
  max_pax: z.number().nonnegative(),
  beds: z.number().nonnegative(),
  size: z.number().nonnegative(),
  village_distance: z.number().nonnegative(),
  lifts_distance: z.number().nonnegative(),
  floor_plan: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  blurred_images: z.string(),
  translations: z.object({
    ar: z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      amenities: z.array(z.string()),
    }),
    en: z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      amenities: z.array(z.string()),
    }),
    ja: z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      amenities: z.array(z.string()),
    }),
    fr: z.object({
      type: z.string(),
      title: z.string(),
      description: z.string(),
      location: z.string(),
      amenities: z.array(z.string()),
    }),
  }),
});
