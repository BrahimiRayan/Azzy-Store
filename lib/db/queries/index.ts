import { and, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "..";
import { ordersTable, productsTable, shopsTable, transactionsTable } from "../schema";
import { user } from "../schema/auth-schema";
// owners
export async function getAllOwners() {
  try {
    // const owners = await db.select().from(user);

    const owners = await db.query.user.findMany({
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
    const [owner] = await db.select().from(user).where(eq(user.id, id)).limit(1);
    if (!owner) {
        throw new Error(`Owner with ID ${id} not found`);
    }
    return owner;
  } catch (error) {
    
    console.error("Error fetching owner by ID:", error);
    throw error;
  }
}

// shops

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

// products

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

export async function getProductByid (id : string){
  if(id.trim().length === 0){
    throw new Error("an id is required"); 
  }

  const product = await db.query.productsTable.findFirst({
    where : eq(productsTable.id , id),
  })

  if(!product){
    return
  }
  return product
}

// orders

export async function getAllOrders(idShop: string) {
    try {
        if (!idShop) {
            throw new Error("Shop ID is required to fetch orders");
        }

        const orders = await db.query.ordersTable.findMany({
            where: eq(ordersTable.idShop, idShop),
        });
      
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export async function getNumberofOrdersByMonth(idshop : string , year : string){
  const orders = await db
  .select({
    month: sql<number>`EXTRACT(MONTH FROM ${ordersTable.date})`.as("month"),
    orderCount: sql<number>`COUNT(*)`.as("orderCount")
  })
  .from(ordersTable)
  .where(
    and(
      eq(ordersTable.idShop , idshop),
      sql`EXTRACT(YEAR FROM ${ordersTable.date}) = ${year}`
    )
  )
  .groupBy(sql`EXTRACT(MONTH FROM ${ordersTable.date})`)
  .orderBy(sql`EXTRACT(MONTH FROM ${ordersTable.date})`);

  return orders
}

// transactions
export async function getAllTransactions(idShop: string) {
    try {
        if (!idShop) {
            throw new Error("Shop ID is required to fetch transactions");
        }

        const transactions = await db.query.transactionsTable.findMany({
            where: eq(transactionsTable.idShop, idShop),
        });

        return transactions;
    } catch (error : any) {
        console.error("Error fetching transactions:", error);
        throw createError({
            statusCode: 500,
            message: `Error fetching transactions: ${error.message}`,
        })
        
    }
}

export async function getTransactionsByYear(transType : ("A" | "V") , year : string , idshop : string){
  const monthlyTransactions = await db
  .select({
    month: sql<number>`EXTRACT(MONTH FROM ${transactionsTable.date})`.as("month"),
    transactionCount: sql<number>`COUNT(*)`.as("transactionCount"),
    totalQuantity: sql<number>`SUM(${transactionsTable.qte})`.as("totalQuantity"),
    totalPurchaseAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.pua_t})`.as("totalPurchaseAmount"),
    totalSaleAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.puv_t})`.as("totalSaleAmount")
  })
  .from(transactionsTable)
  .where(
    and(
      eq(transactionsTable.idShop ,idshop),
      eq(transactionsTable.type, transType),
      sql`EXTRACT(YEAR FROM ${transactionsTable.date}) = ${year}`
    )
  )
  .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`)
  .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`);

  return monthlyTransactions;
}

// this function get the stats data for a single product 
export async function getTransactionsForProduct( transType : ("A" | "V") , year : string , idshop : string ,productId : string){
   return await db
    .select({
      month: sql<number>`EXTRACT(MONTH FROM ${transactionsTable.date})`.as("month"),
      transactionCount: sql<number>`COUNT(*)`.as("transactionCount"),
      totalQuantity: sql<number>`SUM(${transactionsTable.qte})`.as("totalQuantity"),
      totalPurchaseAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.pua_t})`.as("totalPurchaseAmount"),
      totalSaleAmount: sql<number>`SUM(${transactionsTable.qte} * ${transactionsTable.puv_t})`.as("totalSaleAmount")
    })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.idShop , idshop),
        eq(transactionsTable.idProduct, productId),
        eq(transactionsTable.type, transType),
        sql`EXTRACT(YEAR FROM ${transactionsTable.date}) = ${year}`
      )
    )
    .groupBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`)
    .orderBy(sql`EXTRACT(MONTH FROM ${transactionsTable.date})`);
}

// products transactions
export async function getAlltransactionWithProducts(){
  const transactionProducts = await db.query.orderProductsTable.findMany({
    with : {
      order : true , 
      product : true,
    }
  })
  return transactionProducts 
}