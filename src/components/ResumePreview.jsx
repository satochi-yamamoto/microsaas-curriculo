import React from 'react';

const parseMarkdownToJsx = (markdown) => {
  if (!markdown) return null;

  const lines = markdown.split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-1">{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    if (line.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index} className="text-xl font-bold mt-6 mb-3 text-blue-300 border-b-2 border-blue-300/30 pb-2">{line.substring(4)}</h3>);
      return;
    }
    if (line.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-blue-200">{line.substring(3)}</h2>);
      return;
    }
    if (line.startsWith('* ')) {
      const parts = line.substring(2).split('**');
      const jsxLine = parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
      listItems.push(<li key={index}>{jsxLine}</li>);
      return;
    }

    flushList();
    if (line.trim() === '') {
      elements.push(<br key={index} />);
    } else {
      const parts = line.split('**');
      const jsxLine = parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{part}</strong> : part));
      elements.push(<p key={index} className="my-2 text-gray-300 leading-relaxed">{jsxLine}</p>);
    }
  });

  flushList();
  return elements;
};

export function ResumePreview({ data }) {
  if (!data) return null;

  const { nomeCompleto, cargoDesejado, generatedContent } = data;

  return (
    <div id="resume-to-print" className="bg-white/5 rounded-lg p-8 text-left mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">{nomeCompleto}</h1>
        <h2 className="text-2xl text-blue-300">{cargoDesejado}</h2>
      </div>
      <div className="prose prose-invert max-w-none">
        {parseMarkdownToJsx(generatedContent)}
      </div>
    </div>
  );
}