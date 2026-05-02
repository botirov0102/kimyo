import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Telegram Integration
  app.post('/api/book', async (req, res) => {
    const { name, phone, time } = req.body;
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('Telegram Bot Token or Chat ID not configured. Booking received:', { name, phone, time });
      return res.status(200).json({ 
        success: true, 
        message: 'Booking received (Telegram not configured)',
        data: { name, phone, time }
      });
    }

   const message = `
🧪 *KIMYO DARSI UCHUN YANGI BUYURTMA*

━━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${name}
📞 *Telefon:* ${phone}
🕒 *Tanlangan vaqt:* ${time}
━━━━━━━━━━━━━━━━━━━

📊 *Holat:* Yangi so‘rov
⚡ *Ustuvorlik:* YUQORI

📌 *Amal:* Mijoz bilan tez bog‘laning

━━━━━━━━━━━━━━━━━━━
🔔 * Booking System*
`.trim();


    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message,
      parse_mode: 'Markdown'
      });
      res.json({ success: true });
    } catch (error: any) {
      console.error('Telegram Error:', error.response?.data || error.message);
      res.status(500).json({ success: false, error: 'Failed to send Telegram notification' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
