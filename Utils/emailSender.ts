import nodemailer from 'nodemailer'
  const config = useRuntimeConfig()
  const port = parseInt(config.smtpPort as string) || 587

  const transporter = nodemailer.createTransport({
    host: config.smtpHost as string,
    port: port,
    secure: port === 465,
    auth: {
      user: config.smtpUser.trim() as string,
      pass: config.smtpPass.trim()
    },
  } as nodemailer.TransportOptions)

export async function sendVerificationEmail(options: {
  to: string;
  subject: string;
  text: string;
  url: string;
}) {
  try {
    await transporter.sendMail({
      from: config.emailFrom,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de l'Email</title>
    <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;}
    .container { max-width: 600px; margin: 0 auto; padding: 20px;border : 2px solid #00000049 ; border-radius : 8px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-height: 80px; max-width : 80px }
    .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
    .button { 
      display: inline-block; padding: 12px 24px; background: #2563eb; 
      margin : 0 auto;
      color: white !important; text-decoration: none; border-radius: 6px; 
      font-weight: bold; margin: 20px 0; 
    }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
    </style>
  </head>
  <body>
    <div class="container">
    <div class="header">
      <img src="https://azzy-store.vercel.app/emailLogo.jpg" alt="Azze-store" class="logo">
    </div>
    
    <div class="content">
      <p>Bonjour ${options.to},</p>
      <p>Merci de vous être inscrit sur ${options.to} ! Veuillez vérifier votre adresse e-mail pour finaliser votre inscription.</p>
      
      <p><a href="${options.url}" class="button">Vérifier mon adresse e-mail</a></p>
      
      <p>Si le bouton ci-dessus ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
      <p><small>${options.url}</small></p>
      
      <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail.</p>
    </div>
    
    <div class="footer">
      <p>&copy; 2025 Azze-Store. Tous droits réservés.</p>
    </div>
    </div>
  </body>
  </html>
      `
    });
    return true;
  } catch (error) {
    return false;
  }
}


export async function sendShopCustumerMessage(options: {
  to: string;
  subject: string;
  text: string;
  name: string,
  email: string,
  phone : string,
  product : string,
  message: string,
  quantite : number
}) {
  try {
    await transporter.sendMail({
      from: config.emailFrom,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau message client - Commande</title>
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;}
      .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #00000049; border-radius: 8px; }
      .header { text-align: center; padding: 20px 0; }
      .logo { max-height: 80px; max-width: 80px; }
      .content { background: #f9f9f9; padding: 30px; border-radius: 8px; }
      .details { margin: 20px 0; }
      .details th, .details td { padding: 8px 12px; text-align: left; }
      .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #777; }
    </style>
    </head>
    <body>
    <div class="container">
      <div class="header">
      <img src="https://azzy-store.vercel.app/emailLogo.jpg" alt="Azze-store" class="logo">
      </div>
      <div class="content">
      <h2>Nouvelle commande client</h2>
      <p>Bonjour ${options.to},</p>
      <p>Vous avez reçu une nouvelle demande de commande de la part d'un client :</p>
      <table class="details">
        <tr>
        <th>Nom:</th>
        <td>${options.name}</td>
        </tr>
        <tr>
        <th>Email:</th>
        <td>${options.email}</td>
        </tr>
        <tr>
        <th>Téléphone:</th>
        <td>${options.phone}</td>
        </tr>
        <tr>
        <th>Produit:</th>
        <td>${options.product}</td>
        </tr>
        <tr>
        <th>Quantité:</th>
        <td>${options.quantite}</td>
        </tr>
        <tr>
        <th>Message du client:</th>
        <td>${options.message}</td>
        </tr>
      </table>
      <p>Pensez à contacter le client pour finaliser la commande.</p>
      </div>
      <div class="footer">
      <p>&copy; 2025 Azze-Store. Tous droits réservés.</p>
      </div>
    </div>
    </body>
    </html>
      `
    });
    return true;
  } catch (error) {
    return false;
  }
}