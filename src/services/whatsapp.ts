import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config()

const accountSid: string = process.env.ACCOUNT_SID || ''
const authToken: string = process.env.AUTH_TOKEN || ''
const client = twilio(accountSid, authToken)
const contentSid = process.env.CONTENT_SID || ''

export async function sendWhatsAppMessage(
  status: string,
  fecha: string,
  hora: string,
): Promise<any> {
  try {
    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM ?? '',
      to: process.env.WHATSAPP_TO ?? '',
      contentSid: contentSid,
      contentVariables: JSON.stringify({
        '1': status,
        '2': fecha,
        '3': hora,
      }),
    })
    console.log('Mensaje enviado:', result.sid)
    return result
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'message' in err) {
      const error = err as { message?: string; code?: string; moreInfo?: string }
      console.error(
        'Error enviando mensaje WhatsApp:',
        error.message,
        error.code,
        error.moreInfo,
        err,
      )
    } else {
      console.error('Error enviando mensaje WhatsApp:', err)
    }
    throw err
  }
}
