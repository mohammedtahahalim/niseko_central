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

export const accommodationSchema = z.object({
  first_name: z.string().regex(/^[\p{L} ]+$/u, {
    message: "First Name cannot be empty or contain illegal characters",
  }),
  last_name: z.string().regex(/^[\p{L} ]+$/u, {
    message: "Last Name cannot be empty or contain illegal characters",
  }),
  email: z.email({ message: "Please Insert a valid email" }),
  country: z.string().nonempty({ message: "Please Insert a valid country" }),
  phone: z.string().nonempty({ message: "Please Insert a valid phone" }),
  date: z.string().regex(/^\d{2}(\/|-)\d{2}(\1)\d{4}$/, {
    message: "Please Insert a valid date : MM/DD/YYYY",
  }),
  flexibility: z.boolean(),
  nights: z.number().positive(),
  adults: z.number().positive(),
  children: z.number().or(z.null()),
  infants: z.number().or(z.null()),
  properties: z.array(z.number().positive()),
  comments: z.string(),
});

export const generalSchema = z.discriminatedUnion("in_house", [
  z.object({
    in_house: z.literal(false),
    first_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    last_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    email: z.email().nonempty(),
    message: z.string().nonempty(),
  }),
  z.object({
    in_house: z.literal(true),
    first_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    last_name: z
      .string()
      .regex(/^[\p{L} ]+$/u)
      .nonempty(),
    phone: z.string().nonempty(),
    emergency_phone: z.string().nonempty(),
  }),
]);

export const blogsSchema = z.object({
  id: z.number().nonnegative(),
  date: z.string().nonempty(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  ar: z.object({ title: z.string().nonempty() }),
  en: z.object({ title: z.string().nonempty() }),
  ja: z.object({ title: z.string().nonempty() }),
  fr: z.object({ title: z.string().nonempty() }),
});

export const blogSchema = z.object({
  id: z.number().nonnegative(),
  date: z.string().nonempty(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  ar: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  en: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  ja: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
  fr: z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  }),
});

export const conciergeSchema = z.object({
  id: z.number().nonnegative(),
  category: z.string().nonempty(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  en: z.object({
    title: z.string().nonempty(),
  }),
  ar: z.object({
    title: z.string().nonempty(),
  }),
  fr: z.object({
    title: z.string().nonempty(),
  }),
  ja: z.object({
    title: z.string().nonempty(),
  }),
});

export const conciergeArticleSchema = z.object({
  id: z.number().nonnegative(),
  category: z.string().nonempty(),
  image: z.string().nonempty(),
  blur_image: z.string().nonempty(),
  en: z.object({
    title: z.string().nonempty(),
    subtitle: z.string().nonempty(),
    content: z.string().nonempty(),
    prices: z.string(),
  }),
  ar: z.object({
    title: z.string().nonempty(),
    subtitle: z.string().nonempty(),
    content: z.string().nonempty(),
    prices: z.string(),
  }),
  fr: z.object({
    title: z.string().nonempty(),
    subtitle: z.string().nonempty(),
    content: z.string().nonempty(),
    prices: z.string(),
  }),
  ja: z.object({
    title: z.string().nonempty(),
    subtitle: z.string().nonempty(),
    content: z.string().nonempty(),
    prices: z.string(),
  }),
});
