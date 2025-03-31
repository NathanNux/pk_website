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
  
  // Add hashtags to the HTML template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nová zpráva z kontaktního formuláře</title>
      <style>
        /* Existing styles... */
        .hashtags {
          margin-top: 15px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .hashtag {
          background-color: #f0f0f0;
          color: #1a237e;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 14px;
          font-weight: bold;
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
        ${hashtags.length > 0 ? `
        <div class="field">
          <span class="label">Kategorie:</span>
          <div class="hashtags">
            ${hashtags.map(tag => `<span class="hashtag">${tag}</span>`).join('')}
          </div>
        </div>
        ` : ''}
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
    console.log('Odesílám email s daty:', { name, surname, email, phone, message, hashtags });

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gekoncicek@gmail.com',
      reply_to: email,
      subject: subjectLine,
      html: htmlContent,
      // Also include hashtags in the text version
      text: `Jméno: ${name} ${surname || ''}
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