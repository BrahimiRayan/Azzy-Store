import { sendShopCustumerMessage } from '~/Utils/emailSender'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  if(!body){
    throw new Error("No body detected")
  }

  const {to,name , email , phone , product , message , quantite} = body
  try {

    await sendShopCustumerMessage({
      to: to,
      subject: 'Nouvelle commande client',
      text: `Vous avez reçu une nouvelle demande de commande de la part d'un client :
              Nom : ${name}
              email : ${email}
              Tel : ${phone}
              product : ${product} de quantité ${quantite}
              message : ${message}
      `,
      name , 
      email ,
      phone,
      product,
      message ,
      quantite
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return body.to
  }
})