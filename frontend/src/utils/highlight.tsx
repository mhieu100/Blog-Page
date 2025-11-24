import DOMPurify from 'dompurify';

export const highlightText = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 text-gray-900">$1</mark>');
};

export const HighlightedText = ({ text, query }: { text: string, query: string }) => {
    const highlighted = highlightText(text, query);
    
    return (
        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(highlighted) }} />
    );
};
