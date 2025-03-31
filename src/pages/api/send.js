import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, surname, email, phone, message, hashtags = [] } = req.body;
  
  // Use environment variable for API key
  const resend = new Resend(process.env.RESEND_API_KEY || "re_VXvt1hvB_PbbEMozHE9Rh3RN8n6KgC1iY");
  
  // Format subject line with hashtags
  const hashtagsText = hashtags.length > 0 ? ` - ${hashtags.join(' ')}` : '';
  const subjectLine = `Nová zpráva od ${name} ${surname || ''}${hashtagsText}`;
  
  // Swiss design inspired HTML template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nová zpráva z kontaktního formuláře</title>
      <style>
        /* Swiss design inspired styling */
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #000000;
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #ffffff;
        }
        .grid-container {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 40px;
        }
        .header {
          margin-bottom: 30px;
        }
        .header h1 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .content {
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 24px;
        }
        .field {
          display: grid;
          grid-template-columns: 120px 1fr;
          padding-bottom: 16px;
          border-bottom: 1px solid #f0f0f0;
        }
        .label {
          font-weight: 600;
          font-size: 14px;
          color: #333333;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .value {
          font-weight: 400;
        }
        .message-box {
          margin-top: 16px;
          padding-top: 24px;
        }
        .message-box h3 {
          font-size: 16px;
          margin-top: 0;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .message-box p {
          margin: 0;
          line-height: 1.8;
        }
        .hashtags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .hashtag {
          background-color: #f0f0f0;
          color: #000000;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
        }
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 13px;
          color: #666666;
        }
        @media (max-width: 480px) {
          .field {
            grid-template-columns: 1fr;
            grid-gap: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="grid-container">
        <div class="header">
          <h1>Nová zpráva z kontaktního formuláře</h1>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">Jméno</span>
            <span class="value">${name} ${surname || ''}</span>
          </div>
          
          <div class="field">
            <span class="label">E-mail</span>
            <span class="value">${email || 'Neuvedeno'}</span>
          </div>
          
          <div class="field">
            <span class="label">Telefon</span>
            <span class="value">${phone || 'Neuvedeno'}</span>
          </div>
          
          ${hashtags.length > 0 ? `
          <div class="field">
            <span class="label">Kategorie</span>
            <div class="hashtags">
              ${hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
            </div>
          </div>
          ` : ''}
          
          <div class="message-box">
            <h3>Zpráva</h3>
            <p>${message.replace(/\n/g, '<br>') || 'Prázdná zpráva'}</p>
          </div>
        </div>
        
        <div class="footer">
          <p>Tato zpráva byla odeslána z kontaktního formuláře na vašem webu.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  try {
    console.log('Odesílám email s daty:', { name, surname, email, phone, message, hashtags });

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gekoncicek@gmail.com',
      reply_to: email,
      subject: subjectLine,
      html: htmlContent,
      // Also include hashtags in the text version
      text: 
        `Jméno: ${name} ${surname || ''}
Telefon: ${phone || ''}
Email: ${email || ''}
${hashtags.length > 0 ? `Kategorie: ${hashtags.join(', ')}\n` : ''}
Zpráva: ${message || ''}`,
    });

    console.log('Výsledek Resend API:', result);
    
    return res.status(200).json({ success: true, message: 'Email byl úspěšně odeslán.' });
  } catch (error) {
    console.error('Chyba při odesílání emailu:', error);
    return res.status(500).json({ success: false, message: 'Nastala chyba při odesílání emailu.' });
  }
}