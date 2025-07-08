import type { transactionsTable } from "~/lib/db/schema";

//TODO: DELETE SOME OF THIS AFTER INFERING ALL THE TYPES FROM THE SCHEMA
export const SHOPID : string = "57c04eba-fcb2-493e-9879-6255b2337d28";
type category = 'Alimentaire' | 'Electronique' | 'Vêtement' | 'Meuble' | 'Accessoire' | 'Beauté' |'Sport' | 'Livre' | 'Autre';


type Produit = {
    id? : number | string , 
    name : string , 
    img? : string , 
    category : category ,
    pua : number , 
    puv : number ,
    quantity : number ,
}

type OrderProducts = {
  orderprods : {
    date: string,
    id: string,
    forniseur: string | null,
    remarque: string | null,
    products: {
        qte: number,
        product: {
            name: string,
            id: string,
            type: category,
        },
    }[],
}[]}
type Transaction = typeof transactionsTable.$inferSelect;

type chartData = {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        borderColor: string,
        backgroundColor: string,
    }[]
}
type datasetType = {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    tension: number,
    fill?: boolean

  }


  type LinechartData = {
    labels : string[] , 
    datasets : datasetType[]

  }

  type ProductOfCommand = {
    id : number | string ,
    name : string ,
    category : category ,
    quantity : number ,
  }

  type Cammande = {
    id : number | string ,
    date : Date  | string,
    fournisseur: string | null,
    produits : ProductOfCommand[] ,
  }

  type card_t = "A" | "B" | "C" | "D";

  interface shopConfT {
    name : string,
    description : string,
    logo? : string,
    Products : string[],
    livraison : boolean,
    cardType? : card_t, 
    textColor? : string,
    bg?: string,
    fb_url? : string,
    ig_url?: string,
    phone : string,
    email : string,
    address? : string,
    xcor?: number,
    ycor? : number
}

export type { Produit , Transaction ,chartData , LinechartData , Cammande ,shopConfT , card_t , category , OrderProducts} ;