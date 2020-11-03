import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import LoadingWrapper from "../common/LoadingWrapper";
import styles from "./styles/pdfViewer.module.scss";
import { LoadingOutlined } from "@ant-design/icons";

// pdf worders
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function MyApp({ file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  let pages = new Array(numPages);
  pages.fill(0);

  return (
    <div>
      <Document
        className={styles.pdf_viewer}
        file={file.path}
        loading={<LoadingOutlined />}
        onLoadSuccess={onDocumentLoadSuccess}>
        {pages.length > 0 &&
          pages.map((page, i) => <Page pageNumber={i + 1} className={styles.page} key={i} />)}
      </Document>
    </div>
  );
}
