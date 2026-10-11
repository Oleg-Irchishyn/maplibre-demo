import { useState } from 'react';
import { MapView } from './components/MapView';
import { RiskList } from './components/RiskList';
import { riskPoints } from './data/riskPoints';
import './App.css';

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>Climate Risk Dashboard</h1>
        <p>MapLibre GL + OpenFreeMap learning demo</p>
      </header>
      <div className="dashboard__body">
        <aside className="dashboard__sidebar">
          <RiskList points={riskPoints} selectedId={selectedId} onSelect={setSelectedId} />
        </aside>
        <main className="dashboard__map">
          <MapView points={riskPoints} selectedId={selectedId} onSelect={setSelectedId} />
        </main>
      </div>
    </div>
  );
}

export default App;
