import z from "zod";

export const bookingsSchema = z.object({
  id: z.number(),
  images: z.string().nonempty(),
  blurred_images: z.string().nonempty(),
  max_pax: z.number().nonnegative(),
  lifts_distance: z.number(),
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
