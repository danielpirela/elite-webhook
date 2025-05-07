const express = require('express');
const { exec } = require('child_process');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/home/git/webhook', (req, res) => {
  exec('bash /home/prueba/dev/deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error al ejecutar el script:', error);
      return res.status(500).send('Error al ejecutar el script.');
    }

    console.log('✅ Script ejecutado con éxito.');
    res.status(200).send('Actualización completada.');

    // Enviar mensaje por WhatsApp con CallMeBot
    const phone = '549XXXXXXXXXX'; // Reemplaza con tu número (sin +)
    const apikey = 'tu_apikey';    // Reemplaza con tu API key de CallMeBot
    const message = encodeURIComponent('✅ Deploy completado con éxito.');

    axios.get(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apikey}`)
      .then(() => console.log('📲 Mensaje de WhatsApp enviado'))
      .catch(err => console.error('❌ Error al enviar WhatsApp:', err.message));
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook escuchando en http://localhost:${PORT}/home/git/webhook`);
});
