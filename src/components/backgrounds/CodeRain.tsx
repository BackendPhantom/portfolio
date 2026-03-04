import { useEffect, useRef } from "react";

// Actual code snippets that are syntactically and semantically correct
const codeSnippets = [
  // React hooks
  "const [state, setState] = useState(false);",
  "def func(arg1, arg2): ReturnType { }",
  "const [count, setCount] = useState(0);",
  "const [data, setData] = useState<User[]>([]);",
  "const [loading, setLoading] = useState(true);",
  "const [error, setError] = useState<Error | null>(null);",
  "useEffect(() => { fetchData(); }, []);",
  "useEffect(() => { return () => cleanup(); }, [dep]);",
  "const ref = useRef<HTMLDivElement>(null);",
  "const memoized = useMemo(() => compute(a, b), [a, b]);",
  "const callback = useCallback(() => handle(), []);",

  // Function declarations
  "const handleClick = () => { };",
  "const fetchData = async () => { };",
  "async function getData() { return await api.get(); }",
  "function calculateTotal(items: Item[]) { }",
  "const sum = (a: number, b: number) => a + b;",
  "export const formatDate = (date: Date) => { };",

  // API calls
  "const res = await fetch('/api/users');",
  "const data = await response.json();",
  "axios.get('/api/data').then(res => res.data);",
  "await prisma.user.findMany({ where: { } });",
  "const user = await db.query('SELECT * FROM users');",

  // Variable declarations
  "const API_URL = 'https://api.example.com';",
  "let currentUser: User | null = null;",
  "const config = { port: 3000, host: 'localhost' };",
  "const items = products.filter(p => p.active);",
  "const total = cart.reduce((a, b) => a + b.price, 0);",

  // JSX
  '<div className="container mx-auto">',
  "<button onClick={handleSubmit}>Submit</button>",
  "<input value={value} onChange={handleChange} />",
  "{items.map(item => <Card key={item.id} />)}",
  "<Component {...props} />",

  // Imports/Exports
  "import { useState, useEffect } from 'react';",
  "import type { User, Post } from './types';",
  "export default function App() { }",
  "export { default as Button } from './Button';",
  "import axios from 'axios';",

  // TypeScript
  "interface User { id: string; name: string; }",
  "type Props = { children: React.ReactNode };",
  "const user: User = { id: '1', name: 'John' };",
  "function generic<T>(arg: T): T { return arg; }",
  "type Status = 'idle' | 'loading' | 'error';",

  // Conditionals
  "if (isValid) { submit(); }",
  "const result = condition ? valueA : valueB;",
  "return error ? <Error /> : <Success />;",
  "data?.user?.profile?.name ?? 'Anonymous';",

  // Console/Debug
  "console.log('Fetching data...');",
  "console.error('Failed to load:', error);",

  // Comments
  "// TODO: Implement caching",
  "// Fix: Handle edge case",
];

// Token types for syntax highlighting
type TokenType =
  | "keyword"
  | "string"
  | "function"
  | "type"
  | "operator"
  | "variable"
  | "comment"
  | "jsx"
  | "number";

interface Token {
  text: string;
  type: TokenType;
}

// Simple tokenizer for syntax highlighting
function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const keywords = [
    "const",
    "let",
    "var",
    "function",
    "async",
    "await",
    "return",
    "if",
    "else",
    "for",
    "while",
    "import",
    "export",
    "from",
    "default",
    "type",
    "interface",
    "class",
    "new",
    "throw",
    "try",
    "catch",
    "finally",
    "typeof",
    "instanceof",
  ];
  const types = [
    "string",
    "number",
    "boolean",
    "null",
    "undefined",
    "void",
    "any",
    "never",
    "unknown",
    "User",
    "Props",
    "Error",
    "Date",
    "Item",
    "T",
    "React",
  ];
  const builtins = [
    "useState",
    "useEffect",
    "useRef",
    "useMemo",
    "useCallback",
    "useContext",
    "console",
    "fetch",
    "axios",
    "prisma",
    "db",
  ];

  // Check if entire line is a comment
  if (code.trim().startsWith("//")) {
    return [{ text: code, type: "comment" }];
  }

  // Split preserving delimiters
  const regex = /('.*?'|".*?"|`.*?`|\d+|\w+|[{}()[\];:,.<>?!=&|+\-*/]+|\s+)/g;
  const parts = code.match(regex) || [];

  for (const part of parts) {
    if (!part) continue;

    if (part.startsWith("'") || part.startsWith('"') || part.startsWith("`")) {
      tokens.push({ text: part, type: "string" });
    } else if (/^\d+$/.test(part)) {
      tokens.push({ text: part, type: "number" });
    } else if (part.startsWith("<") || part.startsWith("</") || part === "/>") {
      tokens.push({ text: part, type: "jsx" });
    } else if (keywords.includes(part)) {
      tokens.push({ text: part, type: "keyword" });
    } else if (types.includes(part)) {
      tokens.push({ text: part, type: "type" });
    } else if (builtins.includes(part)) {
      tokens.push({ text: part, type: "function" });
    } else if (part.match(/^[A-Z][a-zA-Z]*$/)) {
      tokens.push({ text: part, type: "type" });
    } else if (
      part.match(/^(handle[A-Z]|fetch|get|set|on[A-Z]|calculate|format)/)
    ) {
      tokens.push({ text: part, type: "function" });
    } else if (part.match(/^[=!<>+\-*/%&|?:{}()[\];,.]+$/)) {
      tokens.push({ text: part, type: "operator" });
    } else if (part.match(/^\s+$/)) {
      tokens.push({ text: part, type: "variable" }); // whitespace
    } else {
      tokens.push({ text: part, type: "variable" });
    }
  }

  return tokens;
}

// Color scheme for tokens
function getTokenColor(
  type: TokenType,
  isDark: boolean,
  opacity: number
): string {
  const colors: Record<TokenType, string> = {
    keyword: isDark
      ? `rgba(199, 146, 234, ${opacity})`
      : `rgba(139, 92, 246, ${opacity})`, // Purple
    string: isDark
      ? `rgba(152, 195, 121, ${opacity})`
      : `rgba(34, 197, 94, ${opacity})`, // Green
    function: isDark
      ? `rgba(97, 218, 251, ${opacity})`
      : `rgba(6, 182, 212, ${opacity})`, // Cyan
    type: isDark
      ? `rgba(255, 203, 107, ${opacity})`
      : `rgba(217, 119, 6, ${opacity})`, // Yellow/Orange
    operator: isDark
      ? `rgba(171, 178, 191, ${opacity})`
      : `rgba(100, 116, 139, ${opacity})`, // Gray
    variable: isDark
      ? `rgba(224, 108, 117, ${opacity})`
      : `rgba(220, 38, 38, ${opacity})`, // Red
    comment: isDark
      ? `rgba(92, 99, 112, ${opacity})`
      : `rgba(148, 163, 184, ${opacity})`, // Dim gray
    jsx: isDark
      ? `rgba(86, 182, 194, ${opacity})`
      : `rgba(14, 165, 233, ${opacity})`, // Teal/Sky
    number: isDark
      ? `rgba(209, 154, 102, ${opacity})`
      : `rgba(194, 65, 12, ${opacity})`, // Orange
  };
  return colors[type];
}

interface CodeLine {
  snippet: string;
  tokens: Token[];
  y: number;
  x: number;
  speed: number;
  opacity: number;
}

export const CodeRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resize);
    resize();

    const fontSize = 13;
    const lineHeight = fontSize * 1.5;
    const numLines = Math.ceil(width / 250) * 3; // Adjust density based on screen width

    const lines: CodeLine[] = [];

    // Initialize code lines
    for (let i = 0; i < numLines; i++) {
      const snippet =
        codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      lines.push({
        snippet,
        tokens: tokenize(snippet),
        y: Math.random() * height,
        x: Math.random() * (width - 300),
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.5 + Math.random() * 0.5,
      });
    }

    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      lastTime = currentTime - (deltaTime % frameInterval);

      const isDark = document.documentElement.classList.contains("dark");

      // Clear with theme-appropriate background
      ctx.fillStyle = isDark ? "#0a0a0f" : "#fafafc";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Fira Code', 'Monaco', 'Consolas', monospace`;
      ctx.textBaseline = "top";

      // Draw each line with syntax highlighting
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let currentX = line.x;

        // Draw each token with its color
        for (const token of line.tokens) {
          ctx.fillStyle = getTokenColor(token.type, isDark, line.opacity);
          ctx.fillText(token.text, currentX, line.y);
          currentX += ctx.measureText(token.text).width;
        }

        // Update position
        line.y += line.speed;

        // Reset when off screen
        if (line.y > height + lineHeight) {
          line.y = -lineHeight;
          line.x = Math.random() * (width - 300);
          line.snippet =
            codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          line.tokens = tokenize(line.snippet);
          line.speed = 0.3 + Math.random() * 0.7;
          line.opacity = 0.5 + Math.random() * 0.5;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-[#fafafc] dark:bg-[#0a0a0f]"
      aria-hidden="true"
    />
  );
};
