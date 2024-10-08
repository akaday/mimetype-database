import React from "react";

const MimeTypeTemplate = ({ pageContext }) => {
  const { mimeType } = pageContext;
  return (
    <div>
      <h1>{mimeType.type}</h1>
      <p>Extensions: {mimeType.extensions.join(', ')}</p>
      <p>Compressible: {mimeType.compressible ? 'Yes' : 'No'}</p>
      <p>Charset: {mimeType.charset}</p>
    </div>
  );
};

export default MimeTypeTemplate;
