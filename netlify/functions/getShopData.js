const fetch = require('node-fetch');

exports.handler = async (event) => {
  const shopId = event.queryStringParameters.shop;
  if (!shopId) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing shop ID' }) };
  }

  // Environment variables (Netlify में set करना है)
  const SCRIPT_URL = process.env.SCRIPT_URL;
  const SECRET_TOKEN = process.env.SECRET_TOKEN;

  if (!SCRIPT_URL || !SECRET_TOKEN) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server config error' }) };
  }

  const url = `${SCRIPT_URL}?shop=${shopId}&token=${SECRET_TOKEN}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};