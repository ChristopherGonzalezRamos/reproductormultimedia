import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import video1 from '../assets/imagenes/imagen1.png';
import video2 from '../assets/imagenes/imagen2.png';
import video3 from '../assets/imagenes/imagen3.png';
import music1 from '../assets/imagenes/musica1.jpg';
import music2 from '../assets/imagenes/musica2.jpg';
import music3 from '../assets/imagenes/musica3.jpg';

const themeCielo = 'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100';

function Menu() {
    const navigate = useNavigate();
    const videoImages = [video1, video2, video3];
    const musicImages = [music1, music2, music3];

    const [currentVideoImage, setCurrentVideoImage] = useState(0);
    const [currentMusicImage, setCurrentMusicImage] = useState(0);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        const videoInterval = setInterval(() => {
            setCurrentVideoImage((prevImage) => (prevImage + 1) % videoImages.length);
        }, 3000);

        const musicInterval = setInterval(() => {
            setCurrentMusicImage((prevImage) => (prevImage + 1) % musicImages.length);
        }, 3000);

        return () => {
            clearInterval(videoInterval);
            clearInterval(musicInterval);
        };
    }, [videoImages.length, musicImages.length]);

    return (
        <div className={`${themeCielo} w-full h-screen flex flex-col items-center justify-center text-white relative`}>
            <h1 className="text-5xl font-bold mb-4">Bienvenid@</h1>
            <p className="text-xl mb-2">Disfruta de tu contenido multimedia de la mejor manera...</p>
            <p className="text-2xl mb-8">¿Qué deseas escuchar/ver hoy?</p>

            {/* Contenedor para centrar los botones */}
            <div className="flex justify-center items-center space-x-10 mt-8">
                <div
                    className={`w-48 h-48 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-500 ${
                        hoveredButton === 'video' ? 'scale-110' : 'scale-100'
                    }`}
                    onMouseEnter={() => setHoveredButton('video')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate('/video')}
                    style={{
                        backgroundColor: 'white',
                        backgroundImage: hoveredButton === 'video' ? `url(${videoImages[currentVideoImage]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className={`w-full h-full flex items-center justify-center ${hoveredButton === 'video' ? 'bg-opacity-60' : ''}`}>
                        <p className={`text-xl font-semibold text-center ${hoveredButton === 'video' ? 'text-white' : 'text-black'}`}>
                            Video
                        </p>
                    </div>
                </div>

                <div
                    className={`w-48 h-48 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform duration-500 ${
                        hoveredButton === 'music' ? 'scale-110' : 'scale-100'
                    }`}
                    onMouseEnter={() => setHoveredButton('music')}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate('/music')}
                    style={{
                        backgroundColor: 'white',
                        backgroundImage: hoveredButton === 'music' ? `url(${musicImages[currentMusicImage]})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className={`w-full h-full flex items-center justify-center ${hoveredButton === 'music' ? 'bg-opacity-60' : ''}`}>
                        <p className={`text-xl font-semibold text-center ${hoveredButton === 'music' ? 'text-white' : 'text-black'}`}>
                            Música
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;
