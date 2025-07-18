import { useEffect } from 'react';
import Map, { Source, Layer, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateGeometry } from '@/store/NewTripSlice';


export default function MapBoxMap() {

  const geometry = useSelector((state: RootState) => state.newTrip.geometry);
  const stops = useSelector((state: RootState) => state.newTrip.stops);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stops.length < 2) {
      dispatch(updateGeometry(null));
      return
    };
    (async () => {
      const res = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(stops.map(stop => stop.coordinates)),
      });
      const data = await res.json();
      dispatch(updateGeometry(data.routes[0].geometry));
    })()
  }, [stops]);

  const handleMapRef = (node: any) => {

    if (!node || typeof node.fitBounds !== 'function') return;
    if (!geometry || !geometry.coordinates || !geometry.coordinates.length) return;

    // remove all labels from the map
    node.on('load', () => {
      const map = node.getMap();
      map.style.stylesheet.layers.forEach(function (layer: any) {
        if (layer.type === 'symbol') {
          map.setLayoutProperty(layer.id, "visibility", "none");
        }
      });
    });

    const coordinates = geometry.coordinates;
    let minLng = coordinates[0][0], minLat = coordinates[0][1];
    let maxLng = coordinates[0][0], maxLat = coordinates[0][1];
    coordinates.forEach(([lng, lat]: [number, number]) => {
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
    });
    node.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 1000 }
    );
  };

  if (!geometry) return <div>Add 2 stops to see the map</div>;

  return (
    <Map
      ref={handleMapRef}
      reuseMaps
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v11"
      preserveDrawingBuffer={true}
      attributionControl={false}
      projection="mercator"
    >
      {geometry && (
        <Source
          id="route"
          type="geojson"
          data={{
            type: 'Feature',
            geometry,
            properties: {},
          }}
        >
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': 'black',
              'line-width': 5,
            }}
          />
        </Source>
      )}
      {stops &&
        stops.map((stop) => {
          return (
            <div key={stop.id} className="relative">
              <Marker
                longitude={stop.coordinates[0]}
                latitude={stop.coordinates[1]}
                anchor="bottom"
              >
                <div
                  className="rounded-full bg-black w-3 h-3"
                  tabIndex={0}
                  aria-label={stop.name}
                  role="button"
                  onClick={() => { }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      // No-op for now
                    }
                  }}
                />
                <div
                  className="absolute top-[10px] left-[10px] no-select max-w-24 overflow-hidden text-ellipsis whitespace-nowrap font-bold text-black drop-shadow-[0_1px_0_white,0_-1px_0_white,1px_0_0_white,-1px_0_0_white]"
                >
                  {stop.name}
                </div>
              </Marker>
            </div>
          )
        })}
    </Map>
  );
}
