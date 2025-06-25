import { Typewriter } from 'react-simple-typewriter';
import laptopImg from './assets/la.jpeg'; // adjust path if your file is deeper


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-purple-800 flex items-center justify-center">
      <div className="relative w-[600px] h-[400px]">
        <img src={laptopImg} alt="Laptop" className="w-full" />

        {/* Typing area */}
        <div className="absolute top-[25%] left-[12%] w-[75%] h-[50%] text-green-400 font-mono text-sm whitespace-pre-line leading-relaxed">
          <Typewriter
            words={[
              'int main() {\n  int n;\n  cin >> n;\n  cout << n * n;\n}'
            ]}
            cursor
            cursorStyle="_"
            typeSpeed={40}
            delaySpeed={1000}
          />
        </div>
      </div>
    </div>
  );
}
