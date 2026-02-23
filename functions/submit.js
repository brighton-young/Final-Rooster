export async function onRequest({ request, env }) {
  try {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const formData = await request.formData();
    const payload = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = value;
    }

    const accessKey = env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return new Response(JSON.stringify({ error: 'Missing Web3Forms access key' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    payload.access_key = accessKey;

    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new URLSearchParams(payload)
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), { status: resp.status, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
