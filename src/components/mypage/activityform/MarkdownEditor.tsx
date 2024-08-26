import { useDarkMode } from '@/context/DarkModeContext';
import '@uiw/react-markdown-preview/markdown.css';
import MDEditor, { commands } from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import React from 'react';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function MarkdownEditor({
  value,
  onChange,
}: MarkdownEditorProps) {
  const { isDarkMode } = useDarkMode();

  const customCommands = commands
    .getCommands()
    .filter((command) => command.name !== 'image');

  return (
    <MDEditor
      className="[&_.w-md-editor-text]:h-full"
      value={value}
      onChange={(val) => onChange(val || '')}
      previewOptions={{
        remarkPlugins: [remarkGfm],
      }}
      commands={customCommands}
      highlightEnable={false}
      height={400}
      data-color-mode={isDarkMode ? 'dark' : 'light'}
    />
  );
}
