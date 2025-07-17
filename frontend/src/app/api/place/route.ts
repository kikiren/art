import { NextRequest } from 'next/server';

// GET: /api/place
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  if (!query) {
    return new Response(
      JSON.stringify({ error: 'Query parameter is required' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
  );
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
