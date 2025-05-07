# Elite Webhook WhatsApp

Este proyecto es un webhook para enviar mensajes de WhatsApp usando la API de Twilio. Está desarrollado en TypeScript y pensado para integraciones automatizadas.

## Requisitos

- Node.js >= 14
- Una cuenta de Twilio y credenciales de WhatsApp

## Instalación

1. Clona este repositorio:
   ```bash
   git clone <REPO_URL>
   cd elite-webhook
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Crea un archivo `.env` en la raíz con las siguientes variables:
   ```env
   TWILIO_ACCOUNT_SID=tu_account_sid
   TWILIO_AUTH_TOKEN=tu_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890
   TO_WHATSAPP_NUMBER=whatsapp:+0987654321
   CONTENT_SID=tu_content_sid
   ```

## Uso

El servicio principal es `sendWhatsAppMessage`, que envía un mensaje WhatsApp usando los datos proporcionados.

Ejemplo de uso en código:
```typescript
import { sendWhatsAppMessage } from './src/services/whatsapp';

sendWhatsAppMessage('Estado', '2025-05-07', '16:00')
  .then(res => console.log('Enviado:', res))
  .catch(err => console.error('Error:', err));
```

## Estructura principal

- `src/services/whatsapp.ts`: Lógica para enviar mensajes WhatsApp con Twilio.
- `.env`: Variables de entorno sensibles (no subir a git).

## Notas
- Asegúrate de tener configurado el número de WhatsApp en Twilio y el Content SID.
- No compartas tu archivo `.env`.

