import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, surname, email, phone, message } = req.body;
  const resend = new Resend("re_VXvt1hvB_PbbEMozHE9Rh3RN8n6KgC1iY");
  
  // Vytvoření HTML verze e-mailu
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nová zpráva z kontaktního formuláře</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #1a237e;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
        }
        .footer {
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #666;
        }
        .field {
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        .label {
          font-weight: bold;
          color: #555;
          margin-right: 10px;
        }
        .value {
          color: #000;
        }
        .message-box {
          background-color: white;
          border-left: 4px solid #1a237e;
          padding: 15px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nová zpráva z kontaktního formuláře</h1>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">Jméno:</span>
          <span class="value">${name} ${surname || ''}</span>
        </div>
        <div class="field">
          <span class="label">E-mail:</span>
          <span class="value">${email || 'Neuvedeno'}</span>
        </div>
        <div class="field">
          <span class="label">Telefon:</span>
          <span class="value">${phone || 'Neuvedeno'}</span>
        </div>
        <div class="message-box">
          <h3>Zpráva:</h3>
          <p>${message.replace(/\n/g, '<br>') || 'Prázdná zpráva'}</p>
        </div>
      </div>
      <div class="footer">
        <p>Tato zpráva byla odeslána z kontaktního formuláře na vašem webu.</p>
      </div>
    </body>
    </html>
  `;
  
  try {
    console.log('Odesílám email s daty:', { name, surname, email, phone, message });

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gekoncicek@gmail.com',
      reply_to: email,
      subject: `Nová zpráva od ${name} ${surname || ''}`,
      html: htmlContent,
      // Zachováme také textovou verzi pro e-mailové klienty, které nepodporují HTML
      text: `Jméno: ${name} ${surname || ''}
Telefon: ${phone || ''}
Email: ${email || ''}
Zpráva: ${message || ''}`,
    });

    console.log('Výsledek Resend API:', result);
    
    return res.status(200).json({ success: true, message: 'Email byl úspěšně odeslán.' });
  } catch (error) {
    console.error('Chyba při odesílání emailu:', error);
    return res.status(500).json({ success: false, message: 'Nastala chyba při odesílání emailu.' });
  }
}