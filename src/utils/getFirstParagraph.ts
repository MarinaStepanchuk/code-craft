const getFirstParagraph = (text: string): string => {
  if (typeof text !== 'string') {
    return '';
  }

  const indexOpeningTag = text.indexOf('<p>');
  const indexClosingTag = text.indexOf('</p>');
  const paragraph = text.slice(indexOpeningTag + 3, indexClosingTag);
  const regex = /(<([^>]+)>)/gi;
  const result = paragraph.replace(regex, '');
  return result;
};

export default getFirstParagraph;
