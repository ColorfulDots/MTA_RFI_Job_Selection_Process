import {
  _richTextFormatAdmin,
  _richTextModulesAdmin,
  _richTextModules,
  _richTextFormat,
} from '@/components/index';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';

const ReactQuill = dynamic<any>(() => import('react-quill/dist/react-quill'), {
  ssr: false,
});

export interface RichTextProps {
  onChange: (string: any) => void;
  value: string;
  placeholder?: string;
  style?: any;
  isAdmin?: boolean;
}

export const RichText: React.FC<RichTextProps> = ({
  onChange,
  value,
  placeholder,
  style,
  isAdmin,
}) => {
  return (
    <ReactQuill
      theme="snow"
      modules={isAdmin ? _richTextModulesAdmin : _richTextModules}
      formats={isAdmin ? _richTextFormatAdmin : _richTextFormat}
      onChange={onChange}
      value={value || ''}
      placeholder={placeholder}
      style={style}
    />
  );
};
