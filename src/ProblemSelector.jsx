// ProblemSelector.jsx
import './ProblemSelector.css';
import { useState, useEffect } from 'react';

function ProblemSelector() {
  const [handle, setHandle] = useState('');
  const [count, setCount] = useState(3);
  const [minRating, setMinRating] = useState(800);
  const [maxRating, setMaxRating] = useState(1500);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [userSubmissions, setUserSubmissions] = useState([]);

  const fetchUserSolved = async () => {
    const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const data = await res.json();
    const solved = new Set();
    data.result.forEach((sub) => {
      if (sub.verdict === 'OK') {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });
    setSolvedProblems(solved);
    setUserSubmissions(data.result);
  };

  const fetchProblems = async () => {
    await fetchUserSolved();
    const res = await fetch('https://codeforces.com/api/problemset.problems');
    const data = await res.json();
    const filtered = data.result.problems.filter(
      (p) =>
        p.rating &&
        p.rating >= minRating &&
        p.rating <= maxRating &&
        !solvedProblems.has(`${p.contestId}-${p.index}`)
    );
    const selected = filtered.sort(() => 0.5 - Math.random()).slice(0, count);
    setProblems(selected);
  };

  const pollSubmissions = async () => {
    const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
    const data = await res.json();
    const updated = new Set();
    data.result.forEach((sub) => {
      if (sub.verdict === 'OK') {
        updated.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    });
    setSolvedProblems(updated);
  };

  const progress = problems.length > 0 ? Math.floor(
    problems.filter((p) => solvedProblems.has(`${p.contestId}-${p.index}`)).length / problems.length * 100
  ) : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (handle && problems.length > 0) {
        pollSubmissions();
      }
    }, 2000000000);
    return () => clearInterval(interval);
  }, [handle, problems]);

  useEffect(() => {
    if (progress === 100 && problems.length > 0) {
      alert('🎉 Congratulations! You completed all problems!');
    }
  }, [progress]);

  return (
    <div className="selector-container">
      <h2>Select Your Custom Problem Set</h2>
      <div className="input-group">
        <label>Codeforces Handle:</label>
        <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Number of Problems:</label>
        <input type="number" value={count} onChange={(e) => setCount(+e.target.value)} />
      </div>
      <div className="input-group">
        <label>Min Rating:</label>
        <input type="number" value={minRating} onChange={(e) => setMinRating(+e.target.value)} />
      </div>
      <div className="input-group">
        <label>Max Rating:</label>
        <input type="number" value={maxRating} onChange={(e) => setMaxRating(+e.target.value)} />
      </div>
      <button className="fetch-btn" onClick={fetchProblems}>Fetch Problems</button>

      {problems.length > 0 && (
        <div className="progress-container">
          <label>Progress: {progress}%</label>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <div className="problem-list">
        {problems.map((p, i) => {
          const id = `${p.contestId}-${p.index}`;
          const isSolved = solvedProblems.has(id);
          return (
            <div key={id} className={`problem-card ${isSolved ? 'solved' : ''}`}>
              <a
                href={`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}
                target="_blank"
                rel="noreferrer"
              >
                {p.name} ({p.rating})
              </a>
              <div className="status">{isSolved ? '✅ Solved' : '❌ Not yet'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProblemSelector;
