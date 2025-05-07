import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sendWhatsAppMessage } from './services/whatsapp.js';
import { runDeployScript } from './services/deploy.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const now = new Date();
  const fecha = now.toLocaleDateString("es-VE");
  const hora = now.toLocaleTimeString("es-VE", { hour: '2-digit', minute: '2-digit' });
  try {
    await runDeployScript();
    await sendWhatsAppMessage("fue exitoso", fecha, hora);
    res.status(200).send('Deploy completado.');
  } catch (err) {
    await sendWhatsAppMessage("falló", fecha, hora);
    res.status(500).send('Error en el deploy o WhatsApp.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en puerto ${PORT}`);
});
