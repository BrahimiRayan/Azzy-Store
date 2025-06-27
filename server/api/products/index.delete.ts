import { deleteProductById } from "~/lib/db/queries";

export default defineEventHandler(async (event) => {
  const {id} = await readBody(event);
  
  try {
    await deleteProductById(id);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not able to delete ."
    });
  }
});