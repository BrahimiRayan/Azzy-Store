import { sendVerificationEmail } from '~/Utils/emailSender'

// this for my users to comminicate with me ...

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  if(!body){
    throw new Error("No body detected")
  }
  try {

    await sendVerificationEmail({
      to: body.to,
      subject: body.subject,
      text: body.text,
      url : ''
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return body.to
  }
})