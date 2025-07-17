import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const coordStr = body.map((c: any[]) => c.join(',')).join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordStr}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}&geometries=geojson&overview=full`;
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(
        `Mapbox Directions API error: ${resp.status} ${resp.statusText}`
      );
    }
    const data = await resp.json();

    if (!data || !data.routes) {
      return new Response(
        JSON.stringify({
          error: 'Invalid response from Mapbox Directions API',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
