export interface ProductFormValues {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

export type ProductFormErrors = Partial<Record<keyof ProductFormValues, string>>;

const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
};

export function validateProduct(values: ProductFormValues): ProductFormErrors {
  const errors: ProductFormErrors = {};
  const title = values.title.trim();
  const price = values.price.trim();
  const imageUrl = values.imageUrl.trim();

  if (!title) errors.title = "Enter a product name.";
  else if (title.length > 60) errors.title = "Keep the name under 60 characters.";

  if (values.description.trim().length > 160) {
    errors.description = "Keep the description under 160 characters.";
  }

  if (!price) errors.price = "Enter a price.";
  else if (Number.isNaN(Number(price)) || Number(price) < 0) {
    errors.price = "Price must be a number of 0 or more.";
  } else if (Number(price) > 1_000_000) {
    errors.price = "Price looks too high.";
  }

  // Only user-typed URLs are checked; bundled demo images are not http(s) URLs.
  if (imageUrl && !imageUrl.startsWith("/") && !imageUrl.startsWith("data:") && !isHttpUrl(imageUrl)) {
    errors.imageUrl = "Enter a valid http(s) image link.";
  }

  return errors;
}
