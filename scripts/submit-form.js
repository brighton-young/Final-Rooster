import { chromium } from 'playwright';

(async () => {
  const url = 'https://brighton-young.github.io/Final-Rooster/contact-apply.html';
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let web3formsResponse = null;
  page.on('response', async (response) => {
    try {
      const req = response.request();
      if (req.url().includes('api.web3forms.com/submit') && req.method() === 'POST') {
        const status = response.status();
        let body = null;
        try { body = await response.json(); } catch (e) { body = await response.text(); }
        web3formsResponse = { status, body };
        console.log('Captured Web3Forms response:', JSON.stringify(web3formsResponse, null, 2));
      }
    } catch (e) {
      // ignore
    }
  });

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Fill fields if present
  await page.fill('#student-name', 'Automated Test').catch(()=>{});
  await page.fill('#dob', '2010-01-01').catch(()=>{});
  await page.fill('#parent-goals', 'E2E smoke test').catch(()=>{});

  // Find the form that posts to web3forms and submit it via JS to avoid anchor interference
  const submitted = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    const target = forms.find(f => f.getAttribute('action') && f.getAttribute('action').includes('api.web3forms.com')) || forms.find(f => f.classList.contains('application-form'));
    if (!target) return false;
    try {
      target.submit();
      return true;
    } catch (e) {
      return false;
    }
  });

  if (!submitted) console.log('No target form found to submit.');

  // wait for network activity / response capture
  await page.waitForTimeout(4000);

  if (!web3formsResponse) console.log('No Web3Forms network response captured (may be blocked by provider).');

  await browser.close();
  if (web3formsResponse) {
    process.exit(web3formsResponse.status === 200 ? 0 : 2);
  } else process.exit(3);
})();
