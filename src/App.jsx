import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoPlayer } from './components/VideoPlayer';
import { MusicPlayer } from './components/MusicPlayer';
import Menu from './components/Menu';

function App() {
    const [videoSrc, setVideoSrc] = useState('');
    const [videoName, setVideoName] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [audioName, setAudioName] = useState('');

    const handleVideoFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setVideoSrc(fileURL);
            setVideoName(file.name);
        }
    };

    const handleAudioFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAudioSrc(fileURL);
            setAudioName(file.name);
        }
    };

    return (
        <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <Routes>
                    {/* Ruta para el menú principal */}
                    <Route path="/" element={<Menu />} />
                    
                    {/* Ruta para el reproductor de video */}
                    <Route 
                        path="/video" 
                        element={
                            <div className="flex flex-col items-center justify-center">
                                {videoName && (
                                    <div className="mb-5 p-2 bg-white text-blue-700 font-semibold w-[750px] text-center border border-gray-300 rounded">
                                        {videoName}
                                    </div>
                                )}
                                <VideoPlayer src={videoSrc} handleFileChange={handleVideoFileChange} />
                            </div>
                        } 
                    />

                    {/* Ruta para el reproductor de música */}
                    <Route 
                        path="/music" 
                        element={
                            <div>
                                {audioName && (
                                    <div className="mb-5 p-2 bg-white text-blue-700 font-semibold w-[750px] text-center border border-gray-300 rounded">
                                        {audioName}
                                    </div>
                                )}
                                <MusicPlayer audioSrc={audioSrc} handleFileChange={handleAudioFileChange} />
                            </div>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
