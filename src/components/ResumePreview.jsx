import React from 'react';

const parseMarkdownToJsx = (markdown) => {
  if (!markdown) return null;

  const lines = markdown.split('\n').filter(line => line.trim() !== '');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(<ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-1">{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={index} className="text-xl font-bold mt-4 mb-2 text-blue-300 border-b-2 border-blue-300/30 pb-1">{trimmedLine.substring(4)}</h3>);
      return;
    }
    if (trimmedLine.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-blue-200">{trimmedLine.substring(3)}</h2>);
      return;
    }
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ') || /^\d+\./.test(trimmedLine)) {
      let content;
      if (trimmedLine.startsWith('- ')) {
        content = trimmedLine.substring(2);
      } else if (trimmedLine.startsWith('* ')) {
        content = trimmedLine.substring(2);
      } else if (/^\d+\./.test(trimmedLine)) {
        content = trimmedLine.substring(trimmedLine.indexOf('.') + 1);
      }
      
      const parts = content.split('**');
      const jsxLine = parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
      listItems.push(<li key={index}>{jsxLine}</li>);
      return;
    }

    flushList();
    if (trimmedLine !== '') {
      const parts = trimmedLine.split('**');
      const jsxLine = parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{part}</strong> : part));
      elements.push(<p key={index} className="my-2 text-gray-300 leading-relaxed">{jsxLine}</p>);
    }
  });

  flushList();
  return elements;
};

export function ResumePreview({ data }) {
  if (!data) return null;

  const { nomeCompleto, cargoDesejado, email, telefone, generatedContent } = data;

  return (
    <div id="resume-to-print" className="bg-white/5 rounded-lg p-6 text-left mt-6">
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-white resume-title">{nomeCompleto}</h1>
        <h2 className="text-2xl text-blue-300 resume-subtitle">{cargoDesejado}</h2>
        {(email || telefone) && (
          <p className="text-gray-300 mt-2 resume-contact">
            {email && <span>{email}</span>}
            {email && telefone && ' • '}
            {telefone && <span>{telefone}</span>}
          </p>
        )}
      </div>
      <div className="prose prose-invert max-w-none resume-content">
        {parseMarkdownToJsx(generatedContent)}
      </div>
    </div>
  );
}