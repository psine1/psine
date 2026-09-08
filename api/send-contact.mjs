const CONTACT_RECIPIENT = 'patricio.sine@gmail.com';
const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const MAX_REQUEST_BYTES = 20_000;

const messages = {
  method: 'This endpoint only accepts contact form submissions.',
  tooLarge: 'The message is too large. Please shorten it and try again.',
  invalidName: 'Please enter a valid name.',
  invalidEmail: 'Please enter a valid email address.',
  invalidMessage: 'Please enter a message between 10 and 5000 characters.',
  invalidOrigin: 'This contact form must be submitted from the PSINE website.',
  notConfigured: 'The email service is not configured yet. Please email us directly.',
  providerError: 'The email service could not send your message. Please try again or email us directly.',
  sent: 'Your message was sent successfully.'
};

function wantsJson(request) {
  return request.headers.get('accept')?.includes('application/json')
    || request.headers.get('x-requested-with')?.toLowerCase() === 'xmlhttprequest';
}

function respond(request, status, success, message, extraHeaders = {}) {
  const headers = {
    'Cache-Control': 'no-store',
    ...extraHeaders
  };

  if (wantsJson(request)) {
    return Response.json({success, message}, {status, headers});
  }

  const title = success ? 'Message sent' : 'Message not sent';
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} | PSINE</title>
  <style>
    body { display:grid; min-height:100vh; margin:0; place-items:center; background:#202020; color:#f8f8f6; font-family:Arial,sans-serif; }
    main { width:min(560px,calc(100% - 40px)); }
    h1 { margin:0 0 18px; font-size:clamp(44px,9vw,78px); line-height:.9; }
    p { color:#d6d6d2; font-size:18px; line-height:1.45; }
    a { display:inline-block; margin-top:20px; padding:13px 18px; border-radius:999px; background:#ffcf25; color:#111; font-weight:700; text-decoration:none; }
  </style>
</head>
<body><main><h1>${title}</h1><p>${message}</p><a href="/">Return to PSINE</a></main></body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      ...headers,
      'Content-Type': 'text/html; charset=utf-8'
    }
  });
}

function cleanLine(value) {
  return String(value ?? '').replace(/[\r\n\t]+/g, ' ').trim();
}

function field(formData, name) {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin || origin === 'null') return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return respond(request, 405, false, messages.method, {Allow: 'POST'});
    }

    if (!isSameOrigin(request)) {
      return respond(request, 403, false, messages.invalidOrigin);
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > MAX_REQUEST_BYTES) {
      return respond(request, 413, false, messages.tooLarge);
    }

    let formData;
    try {
      formData = await request.formData();
    } catch {
      return respond(request, 400, false, messages.providerError);
    }

    // Honeypot: real visitors never see or fill this field.
    if (field(formData, 'website').trim()) {
      return respond(request, 200, true, messages.sent);
    }

    const name = cleanLine(field(formData, 'name'));
    const email = cleanLine(field(formData, 'email'));
    const message = field(formData, 'message').trim();
    const source = cleanLine(field(formData, 'source') || 'PSINE website').slice(0, 500);

    if (name.length < 2 || name.length > 100) {
      return respond(request, 422, false, messages.invalidName);
    }

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond(request, 422, false, messages.invalidEmail);
    }

    if (message.length < 10 || message.length > 5000) {
      return respond(request, 422, false, messages.invalidMessage);
    }

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error('Contact email is unavailable: RESEND_API_KEY is not configured.');
      return respond(request, 503, false, messages.notConfigured);
    }

    const from = process.env.CONTACT_FROM_EMAIL?.trim()
      || 'PSINE Website <onboarding@resend.dev>';
    const body = [
      'New inquiry from the PSINE website',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Source: ${source}`,
      '',
      'Message:',
      message
    ].join('\n');

    let resendResponse;
    try {
      resendResponse = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'PSINE-Website/1.0'
        },
        body: JSON.stringify({
          from,
          to: [CONTACT_RECIPIENT],
          reply_to: email,
          subject: `PSINE project inquiry — ${name}`,
          text: body
        })
      });
    } catch (error) {
      console.error('Contact email provider request failed.', {
        error: error instanceof Error ? error.name : 'UnknownError'
      });
      return respond(request, 502, false, messages.providerError);
    }

    if (!resendResponse.ok) {
      let providerCode = 'unknown';
      try {
        const providerResult = await resendResponse.json();
        providerCode = providerResult.name || providerResult.code || providerCode;
      } catch {
        // Keep the public response generic and avoid logging contact details.
      }

      console.error('Contact email provider rejected the request.', {
        status: resendResponse.status,
        code: providerCode
      });
      return respond(request, 502, false, messages.providerError);
    }

    return respond(request, 200, true, messages.sent);
  }
};
