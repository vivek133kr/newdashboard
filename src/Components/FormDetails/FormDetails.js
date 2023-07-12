import { Button } from '@mui/material';
import React from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function FormDetails() {
   const docs = [
     {
       uri: "https://storage.googleapis.com/skills-cloud-storage/lead_form/documents/file_example_JPG_100kB_1689154822082462_1689159760247081.jpg",
     }, // Remote file
   ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "55%",
          height: "fit-content",
          border: "2px solid red",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "2%",
            paddingBottom: "2%",
            paddingLeft: "3%",
          }}
        >
          <h1>Form Details</h1>
          <p>
            Form ID: <span style={{ color: "blue" }}>123456</span>
          </p>
          <p>
            Applicant Name: <span>Purvang Mehta</span>
          </p>{" "}
          <p>
            Date: <span>11/08/2023</span>
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "2%",
            paddingBottom: "2%",
            paddingLeft: "3%",
            marginTop: "2%",
          }}
        >
          <h1>Form Details</h1>
          <p>
            Form ID: <span style={{ color: "blue" }}>123456</span>
          </p>
          <p>
            Applicant Name: <span>Purvang Mehta</span>
          </p>{" "}
          <p>
            Date: <span>11/08/2023</span>
          </p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "2%",
            paddingBottom: "2%",
            paddingLeft: "3%",
            marginTop: "2%",
          }}
        >
          <h1>Form Details</h1>
          <p>
            Form ID: <span style={{ color: "blue" }}>123456</span>
          </p>
          <p>
            Applicant Name: <span>Purvang Mehta</span>
          </p>{" "}
          <p>
            Date: <span>11/08/2023</span>
          </p>
        </div>{" "}
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "2%",
            paddingBottom: "2%",
            paddingLeft: "3%",
            marginTop: "2%",
          }}
        >
          <h1>Form Details</h1>
          <p>
            Form ID: <span style={{ color: "blue" }}>123456</span>
          </p>
          <p>
            Applicant Name: <span>Purvang Mehta</span>
          </p>{" "}
          <p>
            Date: <span>11/08/2023</span>
          </p>
        </div>
      </div>
      <div
        style={{
          width: "35%",

          height: "fit-content",
          marginLeft: "3%",
          border: "2px solid blue",
          display: "flex",

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Preview</h1>
        <div
          style={{
            width: "90%",

            backgroundColor: "gray",
            marginBottom: "20px",
          }}
        >
          {/* <img
            style={{ height: "100%", width: "100%" }}
            src="https://gcs.joshtalks.org/lead_form/documents/file_example_JPG_100kB_1689154822082462.jpg"
            alt="newimg"
          /> */}
          {/* <embed
            src="https://gcs.joshtalks.org/lead_form/documents/amisha_s_resume_1689154936471496.pdf"
            type="application/pdf"
            width="100%"
          /> */}
          <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />{" "}
         
         
                 </div>
        <div
          style={{
            marginBottom: "20px",
          }}
        >
          <Button style={{ backgroundColor: "green", color: "white" }}>
            Approve
          </Button>
          <Button
            style={{
              backgroundColor: "red",
              marginLeft: "30px",
              color: "white",
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormDetails