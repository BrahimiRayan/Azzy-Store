import { addNewProduct } from "~/lib/db/queries";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if(!body){
    throw new Error("Not authorized.");
  }

  const { name, img, imgId, description , type, pua, puv, qte, idShop } = body;

  try {
    const newProduct = await addNewProduct(idShop , name ,description ,img ,imgId, type , pua , puv , qte);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});

