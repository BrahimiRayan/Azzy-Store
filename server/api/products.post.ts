import { db } from "~/lib/db";
import { productsTable } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, image, type, pua, puv, qte, idShop } = body;

  if (!name || !type || pua === undefined || puv === undefined || 
      qte === undefined || !idShop) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    });
  }

  try {
    const newProduct = await db
      .insert(productsTable)
      .values({
        name,
        image: image || "/no-image.png",
        type,
        pua,
        puv,
        qte,
        idShop 
      })
      .returning();
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});

