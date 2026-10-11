'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchRiskPointsRequested } from '@/store/riskSlice';
import { MapView } from './MapView';
import { RiskList } from './RiskList';

export function Dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRiskPointsRequested());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Climate Risk Dashboard</h1>
        <p>Next.js + Redux Toolkit + Redux-Saga + MapLibre GL learning demo</p>
      </header>
      <div className="dashboard__body">
        <aside className="dashboard__sidebar">
          <RiskList />
        </aside>
        <main className="dashboard__map">
          <MapView />
        </main>
      </div>
    </div>
  );
}
