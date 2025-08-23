// app/api/notify/route.ts
import type { NextRequest } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID; //

function escapeHtml(str = '') {
  return String(str).replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c] as string
  );
}

export async function POST(req: NextRequest) {
  if (!BOT_TOKEN || !CHAT_ID) {
    return Response.json(
      { error: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' },
      { status: 500 }
    );
  }

  let payload: { tel?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const tel = (payload.tel || '').trim();
  const msg = (payload.message || '').trim();

  if (!tel || !msg) {
    return Response.json({ error: 'Nothing to send' }, { status: 400 });
  }

  const when = new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });
  const text = [
    '📟 <b>ONYX — Contact Form</b>',
    `📞 <b>Телефон:</b> ${escapeHtml(tel || '—')}`,
    `💬 <b>Повідомлення:</b>\n${escapeHtml(msg || '—')}`,
    `🕒 <i>${when}</i>`,
  ].join('\n');

  const tgRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // HTML is robust and easy to escape
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    }
  );

  const data = await tgRes.json().catch(() => ({}));
  if (!tgRes.ok || (data && data.ok === false)) {
    const reason =
      (data && (data.description || data.error)) || 'Telegram API error';
    return Response.json({ error: reason }, { status: 502 });
  }

  return Response.json({ ok: true });
}
