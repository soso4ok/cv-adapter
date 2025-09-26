import React from 'react';
import './App.css';

function App() {

    const [cvFile, setCvFile] = React.useState(null);
    const [jobDescription, setJobDescription] = React.useState('');
    const [responseMsg, setResponseMsg] = React.useState(null);

    const handleFileChange = (event) => {
        setCvFile(event.target.files[0]);
    };

    const handleTextChange = (event) => {
        setJobDescription(event.target.value);
    };

    const handleGenerateClick = async () => {
        if (!cvFile || !jobDescription) {
            alert("Please provide both CV file and job description.");
            return;
        }
        const formData = new FormData();
        formData.append('cv_file', cvFile);
        formData.append('job_description', jobDescription);


        try {

            const response = await fetch('/api/cv/generate', {
                method: 'POST',
                body: formData,
            });

            const contentType = response.headers.get('content-type') || '';
            let data;
            if (contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || `Unsupported type: ${contentType}`);
            }

            if (!response.ok) {
                const serverMessage = data && (data.message || data.detail || JSON.stringify(data));
                throw new Error(serverMessage || `HTTP ${response.status}`);
            }

            if (data && data.cv_file_name) {
                setResponseMsg(`File recived: ${data.cv_file_name}`);
            } else {
                setResponseMsg(
                    `Unpredicted response from server (HTTP ${response.status}, ${contentType}): ` +
                    `${JSON.stringify(data)}`
                );
            }
        } catch (error) {
            setResponseMsg(`Error: ${error.message}`);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>⚡ CV Adapter</h1>
                <p>Adapt your resume to any job vacancy using AI</p>
            </header>
            <main className="App-main">
                <div className="form-container">
                    <div className="form-section">
                        <h2>1. Upload your CV</h2>
                        <input type="file" onChange={handleFileChange}/>
                    </div>

                    <div className="form-section">
                        <h2>2. Paste the job description</h2>
                        <textarea
                            placeholder="Paste the job description here..."
                            value={jobDescription}
                            onChange={handleTextChange}
                        ></textarea>
                    </div>

                    <button className="generate-button" onClick={handleGenerateClick}>
                        🚀 Generate CV
                    </button>

                    {responseMsg && <p className="response-message">{responseMsg}</p>}
                </div>
            </main>
        </div>
    );
}

export default App;