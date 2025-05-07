import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../styles/Pages/Resume.css';

const Resume = () => {
    const [showPdf, setShowPdf] = useState(false);

    const handleShowResume = () => {
        setShowPdf(true);
    };

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/assets/resume/deepaksarun_resume.pdf';
        link.download = 'DeepakSarunYuvachandran_resume.pdf';
        link.click();
    };

    return (
        <div className="resume-container">
            {!showPdf && (
                <>
                    <img
                        src="/assets/resume.gif"
                        alt="Resume Animation"
                        className="resume-gif"
                    />
                    <div className="button-container">
                        <button onClick={handleShowResume} className=" button show-button">
                            Show Resume
                        </button>
                        <button onClick={handleDownloadResume} className="button download-button">
                            Download Resume
                        </button>
                    </div>
                </>
            )}

            {showPdf && (
                <div className="viewer-container">
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                        <Viewer 
                            fileUrl="/assets/resume/deepaksarun_resume.pdf"
                        />
                    </Worker>
                </div>
            )}
        </div>
    );
};

export default Resume;
