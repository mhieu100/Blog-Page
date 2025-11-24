import DOMPurify from 'dompurify';
import { highlightText } from './highlightUtils';

export const HighlightedText = ({ text, query }: { text: string, query: string }) => {
    const highlighted = highlightText(text, query);
    
    return (
        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlighted) }} />
    );
};
