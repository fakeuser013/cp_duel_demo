// ContestPage.jsx
import { useEffect, useState } from 'react';

function ContestPage({ contestData }) {
  const { handle, selected, startTime } = contestData;
  const [submissions, setSubmissions] = useState([]);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    const poll = setInterval(async () => {
      const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
      const data = await res.json();
      const recent = data.result.filter((sub) => sub.creationTimeSeconds * 1000 >= startTime);
      setSubmissions(recent);
    }, 30000);
    return () => clearInterval(poll);
  }, [handle, startTime]);

  const isSolved = (contestId, index) =>
    submissions.some((s) => s.problem.contestId === contestId && s.problem.index === index && s.verdict === 'OK');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Contest Running... Time: {timer}s</h2>
      {selected.map((p, i) => (
        <div key={i} className="border p-2 rounded">
          <a
            href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {p.name} ({p.rating})
          </a>
          <div>{isSolved(p.contestId, p.index) ? '✅ Solved' : '❌ Not Yet'}</div>
        </div>
      ))}
    </div>
  );
}

export default ContestPage;