import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const FileViewer = ({ fileUrl }) => {
  return (
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={[{ uri: fileUrl }]}
    />
  );
};

export default FileViewer;
