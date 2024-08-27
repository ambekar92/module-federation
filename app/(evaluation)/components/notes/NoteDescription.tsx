import { extensions } from '@/app/shared/form-builder/form-controls/rich-text/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

const NoteDescription = ({content}: any) => {
  const editor = useEditor({
    extensions: extensions,
    content: content,
    editable: false,

  }, [content])
  return (
    <EditorContent editor={editor} />
  )
}

export default NoteDescription
