// this can be a prop passed down from a consumer component if there is a case where different formatters are needed

import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

export const extensions = [
    StarterKit.configure(),
    Document,
    Paragraph,
    Text,
    Heading,
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Highlight.configure(),
    Underline.configure()

  ]