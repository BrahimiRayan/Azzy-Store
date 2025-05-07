type category = 'Alimentaire' | 'Electronique' | 'Vêtement' | 'Meuble' | 'Accessoire' | 'Beauté' |'Sport' | 'Livre' | 'Autre';


type Produit = {
    id : number | string , 
    name : string , 
    img? : string , 
    category : category ,
    pua : number , 
    puv : number ,
    quantity : number ,
}

type Transaction = {
    id : number | string ,
    idProduct : number | string ,
    date : Date ,
    quantity : number ,
    type : string ,
    pua : number ,
    puv : number ,
}

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

  type Cammande = {
    id : number | string ,
    date : Date  | string,
    fournisseur? : string ,
    produits : Produit[] ,
  }
export type { Produit , Transaction ,chartData , LinechartData , Cammande} ;