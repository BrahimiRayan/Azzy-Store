import { addNewProduct } from "~/lib/db/queries";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, image, type, pua, puv, qte, idShop } = body;

  try {
    const newProduct = await addNewProduct(idShop , name , image , type , pua , puv , qte);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});

