import { useEffect, useRef } from 'react';
import { Map as MaplibreMap, Marker, NavigationControl, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { RiskPoint, RiskType } from '../types';

const RISK_COLORS: Record<RiskType, string> = {
  flood: '#2563eb',
  wildfire: '#ea580c',
  heat: '#dc2626',
  drought: '#ca8a04',
};

interface MapViewProps {
  points: RiskPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function MapView({ points, selectedId, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MaplibreMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MaplibreMap({
      container: containerRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [0, 20],
      zoom: 1.5,
    });
    map.addControl(new NavigationControl(), 'top-right');
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    for (const marker of markersRef.current.values()) marker.remove();
    markersRef.current.clear();

    for (const point of points) {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = 'risk-marker';
      el.style.background = RISK_COLORS[point.type];
      el.style.width = `${16 + point.riskScore}px`;
      el.style.height = `${16 + point.riskScore}px`;
      el.setAttribute('aria-label', point.name);

      const popup = new Popup({ offset: 16, closeButton: false }).setHTML(
        `<strong>${point.name}</strong><br />${point.description}<br />Risk score: ${point.riskScore}/10`,
      );

      const marker = new Marker({ element: el })
        .setLngLat([point.lng, point.lat])
        .setPopup(popup)
        .addTo(map);

      el.addEventListener('click', () => onSelect(point.id));

      markersRef.current.set(point.id, marker);
    }
  }, [points, onSelect]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;

    const point = points.find((p) => p.id === selectedId);
    const marker = markersRef.current.get(selectedId);
    if (!point || !marker) return;

    for (const [id, m] of markersRef.current) {
      if (id !== selectedId && m.getPopup()?.isOpen()) m.togglePopup();
    }

    map.flyTo({ center: [point.lng, point.lat], zoom: 5, duration: 800 });
    if (!marker.getPopup()?.isOpen()) marker.togglePopup();
  }, [selectedId, points]);

  return <div ref={containerRef} className="map-view" />;
}
