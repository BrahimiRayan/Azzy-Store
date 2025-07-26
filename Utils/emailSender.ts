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
  <title>Email Verification</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333;}
    .container { max-width: 600px; margin: 0 auto; padding: 20px;border : 2px solid black ; border-radius : 8px; }
    .header { text-align: center; padding: 20px 0; }
    .logo { max-height: 50px; }
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
      <img src="https://azzy-store.vercel.app/Logo-dark.webp" alt="Azze-store" class="logo">
    </div>
    
    <div class="content">
      <p>Hello ${options.to},</p>
      <p>Thank you for signing up with ${options.to}! Please verify your email address to complete your registration.</p>
      
      <p><a href="${options.url}" class="button">Verify Email Address</a></p>
      
      <p>If the button above doesn't work, copy and paste this link into your browser:</p>
      <p><small>${options.url}</small></p>
      
      <p>If you didn't request this, please ignore this email.</p>
    </div>
    
    <div class="footer">
      <p>&copy; 2025 Azze-Store. All rights reserved.</p>
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