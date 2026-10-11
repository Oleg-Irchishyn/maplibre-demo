'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { riskPointSelected } from '@/store/riskSlice';

export function RiskList() {
  const dispatch = useAppDispatch();
  const points = useAppSelector((state) => state.risk.points);
  const selectedId = useAppSelector((state) => state.risk.selectedId);
  const status = useAppSelector((state) => state.risk.status);

  if (status === 'loading' || status === 'idle') {
    return <p className="risk-list__status">Loading risk points…</p>;
  }

  if (status === 'failed') {
    return <p className="risk-list__status">Could not load risk points.</p>;
  }

  return (
    <ul className="risk-list">
      {points.map((point) => (
        <li key={point.id}>
          <button
            type="button"
            className={point.id === selectedId ? 'risk-item risk-item--selected' : 'risk-item'}
            onClick={() => dispatch(riskPointSelected(point.id))}
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
