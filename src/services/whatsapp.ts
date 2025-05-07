import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const accountSid: string = process.env.ACCOUNT_SID || '';
const authToken: string = process.env.AUTH_TOKEN || '';
const client = twilio(accountSid, authToken);
const contentSid = process.env.CONTENT_SID || '';

export async function sendWhatsAppMessage(status: string, fecha: string, hora: string): Promise<any> {
  try {
    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM ?? "",
      to: process.env.WHATSAPP_TO ?? "",
      contentSid: contentSid,
      contentVariables: JSON.stringify({
        "1": status,
        "2": fecha,
        "3": hora
      })
    });
    console.log('Mensaje enviado:', result.sid);
    return result;
  } catch (err: any) {
    console.error('Error enviando mensaje WhatsApp:', err?.message, err?.code, err?.moreInfo, err);
    throw err;
  }
}
