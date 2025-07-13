import { addNewProduct } from "~/lib/db/queries";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if(!body){
    throw new Error("Not authorized.");
  }

  const { name, image, description , type, pua, puv, qte, idShop } = body;

  try {
    const newProduct = await addNewProduct(idShop , name ,description ,image , type , pua , puv , qte);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});

