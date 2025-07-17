import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function MapBoxMap() {
  const stops = useSelector((state: RootState) => state.stopList.list);
  const [routeGeoJSON, setRouteGeoJSON] = React.useState<any>(null);
  const mapRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (stops.length < 2) return;
    (async () => {
      const coords = stops.map(stop => stop.coordinates);

      const res = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(coords),
      });
      const data = await res.json();

      if (!data || !data.routes) {
        throw new Error('Invalid response from Mapbox Directions API');
      }

      setRouteGeoJSON({
        type: 'Feature',
        geometry: data.routes[0].geometry,
      });
    })();
  }, [stops]);

  // 自动缩放到路线
  React.useEffect(() => {
    if (!routeGeoJSON) return;

    const coordinates = routeGeoJSON.geometry.coordinates;

    if (coordinates.length > 0) {
      // 计算 bounds
      let minLng = coordinates[0][0],
        minLat = coordinates[0][1];
      let maxLng = coordinates[0][0],
        maxLat = coordinates[0][1];
      coordinates.forEach(([lng, lat]: [number, number]) => {
        minLng = Math.min(minLng, lng);
        minLat = Math.min(minLat, lat);
        maxLng = Math.max(maxLng, lng);
        maxLat = Math.max(maxLat, lat);
      });
      mapRef.current.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, [routeGeoJSON]);

  return (
    <Map
      ref={mapRef}
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      {routeGeoJSON && (
        <Source id="route" type="geojson" data={routeGeoJSON}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#3b9ddd',
              'line-width': 5,
            }}
          />
        </Source>
      )}
    </Map>
  );
}
