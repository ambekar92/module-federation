import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import TurndownService from 'turndown';
import { marked } from 'marked';
import { DOCUMENT_TEMPLATE_ROUTE } from '@/app/constants/routes';
import fetcher from '@/app/services/fetcher';
import { DocumentTemplate } from '@/app/services/types/document-service/DocumentTemplate';
import { Button } from '@trussworks/react-uswds';

interface BodyContentRendererProps {
  name: string;
  isEditable?: boolean;
}

const containerStyles: React.CSSProperties = {
  position: 'relative',
  minHeight: '100vh'
};

const turndownService = new TurndownService();

const BodyContentRenderer: React.FC<BodyContentRendererProps> = ({ name, isEditable = false }) => {
  const [fullHtmlContent, setFullHtmlContent] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { data: documentTemplates, error } = useSWR<DocumentTemplate[]>(
    DOCUMENT_TEMPLATE_ROUTE,
    fetcher
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
    if (documentTemplates) {
      const matchingTemplate = documentTemplates.find(template => template.name === name);
      if (matchingTemplate) {
        const cleanedContent = cleanHtmlContent(matchingTemplate.content);
        setFullHtmlContent(cleanedContent);
        const extractedBodyContent = extractBodyContent(cleanedContent);
        setBodyContent(extractedBodyContent);
        setMarkdownContent(turndownService.turndown(extractedBodyContent));
      }
    }
  }, [documentTemplates, name]);

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
      console.error('Dang, there was an error converting markdown to html:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setMarkdownContent(turndownService.turndown(bodyContent));
    setIsEditing(false);
  };

  if (error) {return <div>Failed to load content</div>;}
  if (!documentTemplates) {return <div>Loading...</div>;}

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
          <Button type='button' outline onClick={handleCancelClick} disabled={isSaving}>Cancel</Button>
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
