import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JsonViewProps {
  data: any;
}

export const JsonView = ({ data }: JsonViewProps) => {
  return (
    <div className="w-full h-full border border-gray-300 dark:border-border-dark bg-[#1e1e1e] rounded-lg overflow-hidden text-xs md:text-sm">
        <SyntaxHighlighter 
            language="json" 
            style={vscDarkPlus} 
            wrapLongLines={true}
            // 1. Force styling on the container code tag
            codeTagProps={{
                style: {
                    wordBreak: 'break-all',
                    whiteSpace: 'pre-wrap',
                }
            }}
            // 2. Force styling on the pre tag (container)
            customStyle={{ 
              margin: 0, 
              padding: '1.5rem', 
              background: 'transparent',
              height: '100%',
              width: '100%',
              overflowX: 'hidden', // Disable horizontal scroll
              wordWrap: 'break-word',
            }}
        >
            {JSON.stringify(data, null, 4)}
        </SyntaxHighlighter>
    </div>
  );
};