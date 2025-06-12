import { eq } from "drizzle-orm";
import { db } from "..";
import { ownersTable, productsTable, shopsTable } from "../schema";

export async function getAllOwners() {
  try {
    // const owners = await db.select().from(ownersTable);

    const owners = await db.query.ownersTable.findMany({
     with : {
      shop : true,
     }
    })
    return owners;
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
}

export async function getOwnerById(id: string) {
  try {
    const [owner] = await db.select().from(ownersTable).where(eq(ownersTable.id, id)).limit(1);
    if (!owner) {
        throw new Error(`Owner with ID ${id} not found`);
    }
    return owner;
  } catch (error) {
    
    console.error("Error fetching owner by ID:", error);
    throw error;
  }
}

export async function getAllShops(){
    try{
        const shops = await db.select().from(shopsTable) ; 
        if(!shops || shops.length === 0) {
            throw new Error("No shops found");
        }
        return shops;
    }catch(error){
        console.error("Error fetching shops:", error);
        throw error;
    }
}

export async function getAllProducts(idShop: string) {
    try {
        const products = await db.select().from(productsTable).where(eq(productsTable.idShop,idShop)) ;
        if (!products || products.length === 0) {
            throw new Error("No products found");
        }
        return products; 
    } catch (error) {
        throw new Error(`Error fetching products: ${error}`);
    }
}