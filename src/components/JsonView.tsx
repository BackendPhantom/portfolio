import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonViewProps {
  data: any;
}

export const JsonView = ({ data }: JsonViewProps) => {
  return (
    <div className="w-full border border-gray-300 dark:border-border-dark p-0 bg-gray-50 dark:bg-[#0d1117] rounded-lg overflow-hidden">
        {/* Using a dark theme for the code specifically to match the 'hacker' vibe */}
        <SyntaxHighlighter 
            language="json" 
            style={vscDarkPlus} 
            customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
        >
            {JSON.stringify(data, null, 4)}
        </SyntaxHighlighter>
    </div>
  );
};