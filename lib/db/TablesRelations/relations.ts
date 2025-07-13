// Relations 

import { relations } from "drizzle-orm";
import { employeesTable, notesTable, orderProductsTable, ordersTable, productsTable, shopConfTable, shopsTable, transactionsTable } from "../schema";
import { user } from "../schema/auth-schema"; 
export const ownersRelations = relations(user , ({one , many})=>{
  return {
    shop : one(shopsTable) , 
    notes : many(notesTable),
    employees : many(employeesTable)
  } 
}); 

export const shopsRelations = relations(shopsTable, ({ one, many }) => {
  return {
    owner: one(user, { fields: [shopsTable.idOwner], references: [user.id] }),
    employees: many(employeesTable),
    notes: many(notesTable),
    products: many(productsTable),
    orders: many(ordersTable),
    transactions: many(transactionsTable),
    shopConf: one(shopConfTable, { fields: [shopsTable.id], references: [shopConfTable.idShop] }),
  };
});

export const employeesRelations = relations(employeesTable, ({ one , many}) => {
  return {
    owner: one(user, { fields: [employeesTable.idOwner], references: [user.id] }),
    shop: one(shopsTable, { fields: [employeesTable.idShop], references: [shopsTable.id] }),
    notes: many(notesTable),
  };
});

export const notesRelations = relations(notesTable, ({ one }) => {
  return {
    shop: one(shopsTable, { fields: [notesTable.idShop], references: [shopsTable.id] }),
    employee: one(employeesTable, { fields: [notesTable.idEmployee], references: [employeesTable.id] }),
    owner: one(user, { fields: [notesTable.idOwner], references: [user.id] }),
  };
});

export const productsRelations = relations(productsTable, ({ one, many }) => {
  return {
    shop: one(shopsTable, { fields: [productsTable.idShop], references: [shopsTable.id] }),
    transactions: many(transactionsTable),
    orders: many(orderProductsTable),
  };
});
export const ordersRelations = relations(ordersTable, ({ one, many }) => {
  return {
    shop: one(shopsTable, { fields: [ordersTable.idShop], references: [shopsTable.id] }),
    products: many(orderProductsTable),
  };
}
);
export const orderProductsRelations = relations(orderProductsTable, ({ one }) => {
  return {
    order: one(ordersTable, { fields: [orderProductsTable.idOrder], references: [ordersTable.id] }),
    product: one(productsTable, { fields: [orderProductsTable.idProduct], references: [productsTable.id] }),
  };
}
);
export const transactionsRelations = relations(transactionsTable, ({ one }) => {
  return {
    product: one(productsTable, { fields: [transactionsTable.idProduct], references: [productsTable.id] }),
    shop: one(shopsTable, { fields: [transactionsTable.idShop], references: [shopsTable.id] }),
  };
}
);
export const shopConfRelations = relations(shopConfTable, ({ one }) => {
  return {
    shop: one(shopsTable, { fields: [shopConfTable.idShop], references: [shopsTable.id] }),
  };
}
);