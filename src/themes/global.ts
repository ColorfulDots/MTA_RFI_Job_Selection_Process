/* eslint-disable import/no-anonymous-default-export */
export default {
  styles: {
    global: {
      // html: { scrollBehavior: 'smooth' },
      div: { whiteSpace: 'pre-line' },
      '.brand': {
        marginLeft: 2,
        fontWeight: 'normal',
        fontSize: '2xl',
        verticalAlign: 'middle',
      },
      '::selection': { background: 'selection' },
      '::-moz-selection': { background: 'selection' },
      '.jobDescription': { whiteSpace: 'pre-wrap' },
      '.jobDescription ul': {
        marginLeft: 10,
        padding: 0,
        whiteSpace: 'normal',
      },
      '.jobDescription li': {
        margin: 0,
        padding: 0,
        whiteSpace: 'normal',
      },
      '.jobDescription p': {
        margin: 0,
        padding: 0,
        whiteSpace: 'normal',
      },
      '.quill .ql-editor': {
        minHeight: '2xs',
        fontSize: 'md',
      },
      '.quill > .ql-toolbar:first-of-type': {
        display: 'none !important',
      },
    },
  },
};
