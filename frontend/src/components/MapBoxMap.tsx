import * as React from 'react';
import Map, { Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function MapBoxMap() {

  const route = useSelector((state: RootState) => state.newTrip.route);
  const stops = useSelector((state: RootState) => state.newTrip.stops);
  const [geometry, setGeometry] = React.useState<any>(null);
  // const mapRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (stops.length < 2) return;
    (async () => {
      const coords = stops.map(stop => stop.coordinates);

      if (!route) {
        const res = await fetch('/api/route', {
          method: 'POST',
          body: JSON.stringify(coords),
        });
        const data = await res.json();
        console.log(data);
        if (!data || !data.routes) {
          throw new Error('Invalid response from Mapbox Directions API');
        }
        setGeometry(data.routes[0].geometry);
      } else {
        console.log(route);
        setGeometry(route.geometry);
      }


    })();
  }, [stops]);

  const handleMapRef = (node: any) => {
    if (node === null || !geometry) return;
    if (geometry.coordinates && geometry.coordinates.length > 0) {
      const coordinates = geometry.coordinates;
      let minLng = coordinates[0][0], minLat = coordinates[0][1];
      let maxLng = coordinates[0][0], maxLat = coordinates[0][1];
      coordinates.forEach(([lng, lat]: [number, number]) => {
        minLng = Math.min(minLng, lng);
        minLat = Math.min(minLat, lat);
        maxLng = Math.max(maxLng, lng);
        maxLat = Math.max(maxLat, lat);
      });
      // 若地图尚未加载，等待地图onLoad事件
      if (node && typeof node.fitBounds === 'function') {
        node.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 40, duration: 1000 }
        );
      }
    }
  };

  return (
    <Map
      ref={handleMapRef}
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      {geometry && (
        <Source id="route" type="geojson" data={{
          type: 'Feature',
          geometry,
        }}>
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
