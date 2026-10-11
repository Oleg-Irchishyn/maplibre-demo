import type { RiskPoint } from '@/types';

// Stands in for a real REST endpoint (e.g. GET /api/risk-points).
// The artificial delay is there so the saga's loading state is actually visible.
const MOCK_RISK_POINTS: RiskPoint[] = [
  {
    id: 'miami',
    name: 'Miami, FL',
    type: 'flood',
    riskScore: 9,
    lng: -80.1918,
    lat: 25.7617,
    description: 'Low-lying coastal city, high exposure to sea-level rise and storm surge.',
  },
  {
    id: 'new-orleans',
    name: 'New Orleans, LA',
    type: 'flood',
    riskScore: 10,
    lng: -90.0715,
    lat: 29.9511,
    description: 'Below sea level in places; relies heavily on levee infrastructure.',
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles, CA',
    type: 'wildfire',
    riskScore: 8,
    lng: -118.2437,
    lat: 34.0522,
    description: 'Surrounding hills and dry season create recurring wildfire exposure.',
  },
  {
    id: 'phoenix',
    name: 'Phoenix, AZ',
    type: 'heat',
    riskScore: 9,
    lng: -112.074,
    lat: 33.4484,
    description: 'Extreme summer heat with a growing number of 45°C+ days per year.',
  },
  {
    id: 'cape-town',
    name: 'Cape Town, SA',
    type: 'drought',
    riskScore: 7,
    lng: 18.4241,
    lat: -33.9249,
    description: 'Vulnerable to multi-year droughts affecting municipal water supply.',
  },
  {
    id: 'jakarta',
    name: 'Jakarta, ID',
    type: 'flood',
    riskScore: 10,
    lng: 106.8456,
    lat: -6.2088,
    description: 'Sinking coastal megacity with severe seasonal flooding.',
  },
  {
    id: 'athens',
    name: 'Athens, GR',
    type: 'wildfire',
    riskScore: 6,
    lng: 23.7275,
    lat: 37.9838,
    description: 'Hot, dry summers drive an increasing wildfire season around the city.',
  },
  {
    id: 'madrid',
    name: 'Madrid, ES',
    type: 'heat',
    riskScore: 6,
    lng: -3.7038,
    lat: 40.4168,
    description: 'Inland continental climate with intensifying summer heatwaves.',
  },
];

export function fetchRiskPoints(): Promise<RiskPoint[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RISK_POINTS), 600);
  });
}
