export type RiskType = 'flood' | 'wildfire' | 'heat' | 'drought';

export interface RiskPoint {
  id: string;
  name: string;
  type: RiskType;
  riskScore: number;
  lng: number;
  lat: number;
  description: string;
}
