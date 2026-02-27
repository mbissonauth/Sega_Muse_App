


import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // import useLocation
import { supabase } from './createClient';
import './Pages.css';

function Page9() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId; // get userId from navigation state

    if (!userId) {
        console.warn("No user ID passed to Page8!");
    }

    // Retake survey
    const handleRetake = () => {
        navigate("/home");
    };

    // Download document
    const handleDownload = () => {
        const content = `
Thank you for participating in our AI Music Survey.

Your feedback helps improve AI-generated music research.

We appreciate your time!
        `;

        const blob = new Blob([content], { type: "text/plain" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "AI_Music_Survey_ThankYou.txt";
        a.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="app-container">
            <div className="form-card">
                <h2>🎉 Thank You for Completing the Survey!</h2>
                <p className="thank-you-text">
                    Your feedback helps us understand how people perceive AI-generated music.
                    <br />
                    We truly appreciate your time and thoughtful responses!
                </p>

                <button className="next-btn" onClick={handleRetake}>
                    Retake Survey
                </button>

                <button className="next-btn" onClick={handleDownload}>
                    Download
                </button>
            </div>
        </div>
    );
}

export default Page9;