// App.jsx
import { useState } from 'react';
import ContestSetup from './ContestSetup';
import ContestPage from './ContestPage';

function App() {
  const [contestData, setContestData] = useState(null);

  return (
    <div className="p-4">
      {!contestData ? (
        <ContestSetup setContestData={setContestData} />
      ) : (
        <ContestPage contestData={contestData} />
      )}
    </div>
  );
}

export default App;