import type { RiskPoint } from '../types';

interface RiskListProps {
  points: RiskPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function RiskList({ points, selectedId, onSelect }: RiskListProps) {
  return (
    <ul className="risk-list">
      {points.map((point) => (
        <li key={point.id}>
          <button
            type="button"
            className={point.id === selectedId ? 'risk-item risk-item--selected' : 'risk-item'}
            onClick={() => onSelect(point.id)}
          >
            <span className={`risk-badge risk-badge--${point.type}`}>{point.type}</span>
            <span className="risk-item__name">{point.name}</span>
            <span className="risk-item__score">{point.riskScore}/10</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
