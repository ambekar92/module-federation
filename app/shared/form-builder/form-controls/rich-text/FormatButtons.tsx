import { Editor } from '@tiptap/react';
import classes from './Tiptap.module.scss';

const FormatButtons = ({editor}: {editor: Editor}) => {
  return (
    <div className="control-group">
      <div className="button-group">
        <button type='button'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Bullet List
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Ordered List
        </button>
      </div>
      <div className="button-group">
        <button type='button'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Left
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Center
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Right
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Justify
        </button>
      </div>
      <div className="button-group">
        <button type='button'
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Bold
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Italic
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Strike
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Underline
        </button>
        <button type='button'
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive('highlight') ? `${classes['is-active']} ${classes.format}` : classes.format}
        >
          Highlight
        </button>

      </div>
    </div>
  )
}

export default FormatButtons
