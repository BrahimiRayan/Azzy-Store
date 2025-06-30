import { updateProductQuantity } from "~/lib/db/queries";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing required fields: id and qte"
    });
  }

  const { id, qte } = body;
  
  try {
    await updateProductQuantity(id, qte);
    return { 
      success: true
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update product quantity",
      data: {
        originalError: error instanceof Error ? error.message : String(error)
      }
    });
  }
});