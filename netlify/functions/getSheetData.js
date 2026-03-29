const { google } = require('googleapis');

exports.handler = async (event) => {
  const shopId = event.queryStringParameters.shop;
  if (!shopId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing shop ID' }) };
  }

  // Environment variable से credentials load करें
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: shopId,
      range: 'Sheet1!A1:Z'   // यहाँ अपनी शीट का रेंज बदल सकते हो
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(response.data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};