export default async (request, context) => {
  try {
    // Fetch from HamQSL
    const response = await fetch('https://www.hamqsl.com/solarxml.php');
    const xmlData = await response.text();

    // Return with CORS headers
    return new Response(xmlData, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch solar data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const config = { path: '/api/solar' };
