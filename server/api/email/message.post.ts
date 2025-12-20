import { sendShopCustumerMessage } from '~/Utils/emailSender'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  if (!body) {
    throw new Error("No body detected")
  }

  const { to, name, email, phone, products, message } = body


  if (!to || !name || !email || !phone || !products || !message) {
    throw new Error("Missing required fields")
  }


  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Products must be a non-empty array")
  }

  const invalidProducts = products.filter(p =>
    !p.product || !p.quantity || p.quantity <= 0
  )

  if (invalidProducts.length > 0) {
    throw new Error("Invalid product data")
  }

  try {

    const productsList = products.map(p => {
      return ` ${p.quantity} x ${p.product}`
    })


    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0)
    const totalProducts = products.length

    await sendShopCustumerMessage({
      to: to,
      subject: `Nouvelle commande: ${totalProducts} produit(s) - ${name}`,
      text: `📦 NOUVELLE DEMANDE DE COMMANDE

          👤 INFORMATIONS DU CLIENT
          • Nom : ${name}
          • Email : ${email}
          • Téléphone : ${phone}

          🛒 PRODUITS DEMANDÉS
          ${productsList.map(p => `• ${p}`).join('\n')}
          📊 RÉSUMÉ
          • Produits différents : ${totalProducts}
          • Quantité totale : ${totalQuantity} unité(s)

          💬 MESSAGE
          ${message}

          ⏰ DATE
          ${new Date().toLocaleString('fr-FR')}

          --------------------------------
          Généré automatiquement via le site web
      `,
      name,
      email,
      phone,
      products: productsList,
      message,
      quantite: totalQuantity,

    })
    return {
      success: true,
      data: {
        customer: name,
        totalItems: totalQuantity,
        totalProducts: totalProducts
      }
    }
  } catch (error: any) {
    console.error('Email error:', error)
    return {
      error: 'Failed to send email',
      message: error.message
    }
  }
})