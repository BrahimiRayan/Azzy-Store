import type { Transaction } from "~/types/GeneraleT";
type transType = "A" |"V";

// this function i made it , when i want to get only transacrion of type "Achats" or "Ventes"
// it takes an array of transacions and a spesifique type ("A": achat , "V": vente).

export function TotalProductsAorV(transaction : Transaction[] , type : transType) : Transaction[]{
    let temp : Transaction[] = [];
    for(let i= 0 ; i < transaction.length ; i++){
        if(transaction[i].type === type){
            temp.push(transaction[i]);
        }
    }
    return temp;
}

// this function will generate the benifice of eache month bases on the monthlySalles and monthlyBuyings
export function CalculateMonthlyBenifice(salles : number[] , purchases : number[]) : number[]{

    if(salles.length === 0 ){
        return []
    }

    let benifices : number[]= []
    for (let i =0 ; i<salles.length ; i++){
        let benifice = salles[i] - purchases [i] ; 
        benifices.push(benifice)
    }
    return benifices
}
