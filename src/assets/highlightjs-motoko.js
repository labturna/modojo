import hljs from 'highlight.js';

hljs.registerLanguage('motoko', function(hljs) {
  return {
    keywords: 'actor and async await break case catch class continue debug do else for func if in import module not object or return shared switch try type var while',
    contains: [
      {
        className: 'comment',
        begin: '//',
        end: '$'
      },
      {
        className: 'string',
        begin: '"', 
        end: '"',
        contains: [{ begin: '\\\\.' }]
      },
      {
        className: 'number',
        begin: '\\b\\d+(\\.\\d+)?',
        relevance: 0
      },
      {
        className: 'keyword',
        begin: '\\b(actor|and|async|await|break|case|catch|class|continue|debug|do|else|for|func|if|in|import|module|not|object|or|return|shared|switch|try|type|var|while)\\b'
      },
      {
        className: 'operator',
        begin: '=|!=|<|>|\\+|\\-|\\*|\\/|%'
      },
      {
        className: 'punctuation',
        begin: /[{}[\];(),.:]/
      }
    ]
  };
});
