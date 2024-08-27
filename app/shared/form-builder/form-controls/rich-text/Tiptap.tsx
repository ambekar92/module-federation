'use client'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import FormatButtons from './FormatButtons';
import { extensions } from './extensions';

const Tiptap = ({ value, onChange, itemId, size = 'lg' }: { value: string, onChange: any, itemId: any, size?: 'sm' | 'lg' }) => {
  const editor = useEditor(
    {
      extensions: extensions,
      content: value,
      editorProps: {
        attributes: {
          style: 'border: 1px solid #565c65; padding: 1rem;',
        },
      },
      onUpdate({ editor }) {
        onChange(editor.getHTML())
      },
    }, [onChange, itemId])

  if (!editor) {return null}

  return <>
    {size === 'lg' ? <FormatButtons editor={editor} /> :
      <BubbleMenu editor={editor}>
        <FormatButtons editor={editor} />
      </BubbleMenu>
    }
    <EditorContent editor={editor} />
  </>
}

export default Tiptap
