// ContestSetup.jsx
import { useState } from 'react';

function ContestSetup({ setContestData }) {
  const [handle, setHandle] = useState('');
  const [count, setCount] = useState(3);

  const fetchUnsolved = async () => {
    const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const data = await res.json();
    const solved = new Set();
    data.result.forEach((sub) => {
      if (sub.verdict === 'OK') {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });

    const probs = await fetch('https://codeforces.com/api/problemset.problems');
    const probData = await probs.json();
    const filtered = probData.result.problems.filter(
      (p) => p.rating >= 800 && p.rating <= 1600 && !solved.has(`${p.contestId}-${p.index}`)
    );

    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, count);
    setContestData({ handle, selected, startTime: Date.now() });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Setup Your Personal Contest</h2>
      <input
        className="border p-2 rounded w-full"
        placeholder="Enter Codeforces Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        type="number"
        placeholder="Number of problems"
        value={count}
        onChange={(e) => setCount(+e.target.value)}
      />
      <button onClick={fetchUnsolved} className="bg-blue-500 text-white p-2 rounded">
        Start Contest
      </button>
    </div>
  );
}

export default ContestSetup;