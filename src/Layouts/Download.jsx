// pdfjs.GlobalWorkerOptions.workerSrc = //cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js;
// import { Document, Page, pdfjs } from 'react-pdf';
// const [pdfBase64, setPdfBase64] = useState(null);
// const [numPages, setNumPages] = useState(null);
// const [pageNumber, setPageNumber] = useState(1);
// const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
// };

// <div>
//     <h1>PDF Viewer</h1>
//     {pdfBase64 && (
//         <div>
//             <Document
//                 file={{ data: pdfBase64 }}
//                 onLoadSuccess={onDocumentLoadSuccess}
//             >
//                 <Page pageNumber={pageNumber} />
//             </Document>
//             <p>Page {pageNumber} of {numPages}</p>
//         </div>
//     )}
//     {!pdfBase64 && <p>Loading PDF...</p>}
// </div>