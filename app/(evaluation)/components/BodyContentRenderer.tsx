import { LETTER_FOR_APP_ROUTE } from '@/app/constants/local-routes';
import Spinner from '@/app/shared/components/spinner/Spinner';
import { Button } from '@trussworks/react-uswds';
import { marked } from 'marked';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import TurndownService from 'turndown';

interface BodyContentRendererProps {
  name: string;
  isEditable?: boolean;
  applicationId: number | null;
}

const containerStyles: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh'
};

const turndownService = new TurndownService();

const BodyContentRenderer: React.FC<BodyContentRendererProps> = ({ name, isEditable = false, applicationId }) => {
  const [fullHtmlContent, setFullHtmlContent] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: apiHtmlContent, error } = useSWR<string>(
    applicationId && name ? `${LETTER_FOR_APP_ROUTE}?template_name=${name}&application_id=${applicationId}` : null
  );

  const extractBodyContent = (html: string) => {
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    return bodyMatch ? bodyMatch[1].trim() : '';
  };

  const cleanHtmlContent = (html: string) => {
    // remove scripts
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    // removes Microsoft Office specific functions
    html = html.replace(/\b(msoCommentShow|msoCommentHide|msoShowComment)\s*\([^)]*\)/g, '');
    // removes conditional comments
    html = html.replace(/<!--\[if\s+\S*\]>[\s\S]*?<!\[endif\]-->/g, '');

    return html;
  };

  useEffect(() => {
    if (apiHtmlContent) {
      const cleanedContent = cleanHtmlContent(apiHtmlContent);
      setFullHtmlContent(cleanedContent);
      const extractedBodyContent = extractBodyContent(cleanedContent);
      setBodyContent(extractedBodyContent);
      setMarkdownContent(turndownService.turndown(extractedBodyContent));
    }
  }, [apiHtmlContent]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      const newHtmlContent = await marked(markdownContent);
      const updatedFullHtml = fullHtmlContent.replace(
        /<body[^>]*>[\s\S]*<\/body>/i,
        `<body>${newHtmlContent}</body>`
      );
      setFullHtmlContent(updatedFullHtml);
      setBodyContent(newHtmlContent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error converting markdown to html:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setMarkdownContent(turndownService.turndown(bodyContent));
    setIsEditing(false);
  };

  if (error) {return <div>Failed to load content</div>;}
  if (!apiHtmlContent) {return <Spinner center />}

  return (
    <div>
      {isEditable && isEditing ? (
        <div>
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            style={{ width: '100%', height: '300px', maxWidth: '100%', resize: 'vertical' }}
          />
          <Button type='button' onClick={handleSaveClick} disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button type='button' outline onClick={handleCancelClick} disabled={isSaving}>
            Cancel
          </Button>
        </div>
      ) : (
        <div>
          <div
            style={containerStyles}
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />
          {isEditable && <Button type='button' onClick={handleEditClick}>Edit Content</Button>}
        </div>
      )}
    </div>
  );
};

export default BodyContentRenderer;
