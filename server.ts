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
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '7619898680:AAEE3NxQFk3CY1Pp2I7ffQklsQ2wEmlM_FQ';
    const chatId = process.env.TELEGRAM_CHAT_ID || '6375561861';

    // Simple text message to avoid Markdown parsing errors with special characters in names/phones
    const message = `
🧪 Yangi dars band qilindi!
------------------------
👤 Ism: ${name}
📞 Telefon: ${phone}
🕒 Vaqt: ${time}
    `.trim();

    try {
      console.log('Sending Telegram notification...');
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
      });
      console.log('Telegram notification sent successfully');
      res.json({ success: true });
    } catch (error: any) {
      console.error('Telegram Error details:', error.response?.data || error.message);
      res.status(500).json({ success: false, error: 'Telegram xizmati bilan bog\'lanishda xatolik' });
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
