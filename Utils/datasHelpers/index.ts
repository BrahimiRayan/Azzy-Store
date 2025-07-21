import type { ProductTransactionsArrayType, Transaction } from "~/types/GeneraleT";
type transactionType = "A" |"V";

// this function will generate the benifice of eache month bases on the monthlySalles and monthlyBuyings
export function CalculateMonthlyBenifice(salles : ProductTransactionsArrayType , purchases : ProductTransactionsArrayType) : number[]{

    if(salles.length === 0 ){
        return []
    }

    let benifices : number[]= []
    for (let i =0 ; i<salles.length ; i++){
        let benifice = salles[i].totalSaleAmount - purchases[i].totalPurchaseAmount ; 
        benifices.push(benifice)
    }
    return benifices
}

// get all transactions for a product
// export function getSellesOrExpensesForMonths(transactions: ProductTransactionsArrayType, transType: transactionType): ProductTransactionsArrayType {
//   const transactionsMap = new Map<number, ProductTransactionsArrayType[0]>();
//   transactions.forEach(t => {
//     if (t.TransactionType === transType) {
//       transactionsMap.set(Number(t.month), t);
//     }
//   });

//   const result: ProductTransactionsArrayType = [];
//   for (let month = 1; month <= 12; month++) {
//     const existing = transactionsMap.get(month);
//     result.push(
//       existing || {
//         month,
//         transactionCount: 0,
//         totalQuantity: 0,
//         totalPurchaseAmount: 0,
//         totalSaleAmount: 0,
//         TransactionType: transType
//       }
//     );
//   }
//   return result;
// }



// second one

export function getSellesOrExpensesForMonths(
  transactions: ProductTransactionsArrayType,
  transType: transactionType
): ProductTransactionsArrayType {
  const transactionsMap = new Map<number, ProductTransactionsArrayType[0]>();

  transactions.forEach(t => {
    // Convert month to NUMBER for consistent keys
    const monthNum = Number(t.month);
    
    if (t.TransactionType === transType && !isNaN(monthNum)) {
      // Also convert transactionCount to number
      const processedTransaction = {
        ...t,
        month: monthNum,
        transactionCount: Number(t.transactionCount) || 0
      };
      transactionsMap.set(monthNum, processedTransaction);
    }
  });

  // Rest of function unchanged...
  const result: ProductTransactionsArrayType = [];
  for (let month = 1; month <= 12; month++) {
    const existing = transactionsMap.get(month);
    result.push(
      existing || {
        month,
        transactionCount: 0,
        totalQuantity: 0,
        totalPurchaseAmount: 0,
        totalSaleAmount: 0,
        TransactionType: transType
      }
    );
  }
  return result;
}