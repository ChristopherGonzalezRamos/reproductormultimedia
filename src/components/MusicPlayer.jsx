import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faSearch, faVolumeUp, faVolumeMute, faStepForward, faStepBackward, faRedo, faRandom, faPalette } from '@fortawesome/free-solid-svg-icons';
import { IoMdArrowRoundBack } from 'react-icons/io'; 
import styles from '../components/StylesMusicPlayer';
import { useNavigate } from 'react-router-dom';

const phrases = [
    "¿Qué deseas escuchar hoy?",
    "¿Qué tal una canción para animarte?",
    "Trabaja mientras escuchas tu música favorita",
    "Escucha tu música antes de dormir"
];

export const MusicPlayer = () => {
    const navigate = useNavigate();
    const [audioSrc, setAudioSrc] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [artist, setArtist] = useState('');
    const [song, setSong] = useState('');
    const [volume, setVolume] = useState(1);
    const [volumePopupVisible, setVolumePopupVisible] = useState(false);
    const [songList, setSongList] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat one, 2: repeat all
    const [shuffleMode, setShuffleMode] = useState(false);
    const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [showStylePopup, setShowStylePopup] = useState(false);
    const [selectedStyle, setSelectedStyle] = useState('neumorphism');

    const audioRef = useRef(null);
    const fileInputRef = useRef(null);
    const volumeButtonRef = useRef(null);

    useEffect(() => {
        // Cambiar la frase cada 90 segundos (90000 ms)
        const interval = setInterval(() => {
            setCurrentPhrase(prevPhrase => {
                const currentIndex = phrases.indexOf(prevPhrase);
                const nextIndex = (currentIndex + 1) % phrases.length;
                return phrases[nextIndex];
            });
        }, 90000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (audioSrc) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.error('Error playing audio:', error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [audioSrc, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        // Filtrar las canciones/artistas cuando el usuario escribe en el cuadro de búsqueda
        if (searchQuery) {
            const filtered = songList.filter((track) => 
                track.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(songList); // Mostrar todas las canciones si no hay búsqueda
        }
    }, [searchQuery, songList]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const songs = files.map((file) => ({
            src: URL.createObjectURL(file),
            name: file.name.split('.')[0],
        }));

        setSongList(songs);
        setFilteredSongs(songs); // Actualizamos también la lista filtrada
        setCurrentSongIndex(0);
        setAudioSrc(songs[0].src);
        setArtist(songs[0].name.split('-')[0] || 'Desconocido');
        setSong(songs[0].name.split('-')[1] || 'Desconocido');
        setIsPlaying(false);
    };

    const getRandomIndex = () => {
        return Math.floor(Math.random() * songList.length);
    };

    const playNextSong = () => {
        let nextIndex;
        if (shuffleMode) {
            nextIndex = getRandomIndex();
        } else {
            nextIndex = (currentSongIndex + 1) % songList.length;
        }
        setCurrentSongIndex(nextIndex);
        const nextSong = songList[nextIndex];
        setAudioSrc(nextSong.src);
        setArtist(nextSong.name.split('-')[0] || 'Desconocido');
        setSong(nextSong.name.split('-')[1] || 'Desconocido');
        setIsPlaying(true); // Empezar la reproducción automáticamente
    };

    const playPreviousSong = () => {
        let prevIndex;
        if (shuffleMode) {
            prevIndex = getRandomIndex();
        } else {
            prevIndex = (currentSongIndex - 1 + songList.length) % songList.length;
        }
        setCurrentSongIndex(prevIndex);
        const prevSong = songList[prevIndex];
        setAudioSrc(prevSong.src);
        setArtist(prevSong.name.split('-')[0] || 'Desconocido');
        setSong(prevSong.name.split('-')[1] || 'Desconocido');
        setIsPlaying(true); // Empezar la reproducción automáticamente
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    const toggleVolumePopup = () => {
        setVolumePopupVisible(!volumePopupVisible);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSearchClick = () => {
        fileInputRef.current.click();
    };

    const toggleRepeatMode = () => {
        setRepeatMode((prev) => (prev + 1) % 3); // 0 -> 1 -> 2 -> 0
    };

    const toggleShuffleMode = () => {
        setShuffleMode(prev => !prev);
    };

    const handleSongClick = (index) => {
        const selectedSong = songList[index];
        setCurrentSongIndex(index);
        setAudioSrc(selectedSong.src);
        setArtist(selectedSong.name.split('-')[0] || 'Desconocido');
        setSong(selectedSong.name.split('-')[1] || 'Desconocido');
        setIsPlaying(true);
    };

    const handleEndOfSong = () => {
        if (repeatMode === 1) {
            // Repetir la canción actual
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(error => console.error('Error playing audio:', error));
        } else if (repeatMode === 2) {
            // Repetir toda la lista
            playNextSong();
        } else {
            // No repetir, simplemente parar
            setIsPlaying(false);
        }
    };

    const formatTrack = (track) => {
        // Asegúrate de que track sea un objeto con la propiedad name
        if (track && typeof track.name === 'string') {
            // Utiliza track.name directamente
            return track.name;
        }
        // Si track no es válido, devuelve una cadena vacía
        return '';
    };    

    const handleStylePopupToggle = () => {
        setShowStylePopup(!showStylePopup);
    };

    const handleStyleChange = (style) => {
        setSelectedStyle(style);
        setShowStylePopup(false);
    };

    return (
        <div
            className={`music-container bg-gray-100 p-8 rounded-lg shadow-lg ${styles[selectedStyle].player} w-full max-w-6xl mx-auto relative lg:max-w-7xl md:p-24 p-8 ${audioSrc ? 'h-auto' : 'h-112'}`}
        >
            {/* Botón para regresar al menú principal */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 bg-white text-black rounded p-2 z-10"
                title="Regresar al Menú"
            >
                <IoMdArrowRoundBack />
            </button>
    
            {/* Reproductor de música y lista de reproducción en un contenedor flex */}
            <div className="flex flex-col lg:flex-row">
                {/* Reproductor de música */}
                <div className={`music-player ${styles[selectedStyle].player} flex-1 lg:mr-6 ${audioSrc ? 'h-full' : 'h-64 lg:h-80'}`}>
                    <div className={`flex flex-col items-center justify-center h-full mb-6 ${audioSrc ? 'normal-size' : 'large-size'}`}>
                        <button
                            onClick={handleSearchClick}
                            className="flex items-center px-5 py-2"
                            title="Seleccionar canción o audio"
                        >
                            <FontAwesomeIcon icon={faSearch} size={audioSrc ? "lg" : "3x"} className="mr-2" />
                        </button>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            ref={fileInputRef}
                        />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={currentPhrase}
                            className={`text-input text-center text-gray-700 rounded-full px-4 py-2 ml-4 w-full text-sm md:text-md placeholder-gray-600 lg:max-w-md ${audioSrc ? 'normal-input' : 'large-input'}`}
                        />
                    </div>
    
                    {audioSrc && (
                        <>
                            {/* Aquí va el resto del contenido cuando hay audioSrc */}
                            <div className="text-center mb-6">
                                <h2 className={`text-lg md:text-xl font-semibold ${styles[selectedStyle].activeListItem}`}>{song}</h2>
                                <p className={`text-sm md:text-md ${styles[selectedStyle].activeListItem}`}>{artist}</p>
                            </div>
    
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={(currentTime / duration) * 100 || 0}
                                onChange={handleProgressChange}
                                className="w-full mb-6 neumorphism-slider"
                            />
    
                            <div className="flex justify-between text-xs md:text-sm font-semibold mb-6">
                                <span className={`${styles[selectedStyle].neonTime}`}>
                                    {formatTime(currentTime)}
                                </span>
                                <span className={`${styles[selectedStyle].neonTime}`}>
                                    {formatTime(duration)}
                                </span>
                            </div>
    
                            <div className="controls flex items-center justify-center mb-1">
                                <button onClick={toggleRepeatMode} className="mr-6">
                                    <FontAwesomeIcon icon={faRedo} size="lg" color={repeatMode === 0 ? 'gray' : repeatMode === 1 ? 'blue' : 'green'} />
                                </button>
    
                                <button onClick={playPreviousSong} className="mr-4">
                                    <FontAwesomeIcon icon={faStepBackward} size="lg" />
                                </button>
    
                                <button onClick={togglePlayPause} className="px-4 py-4 md:px-5">
                                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" />
                                </button>
    
                                <button onClick={playNextSong} className="ml-4">
                                    <FontAwesomeIcon icon={faStepForward} size="lg" />
                                </button>
    
                                <button onClick={toggleShuffleMode} className="ml-6">
                                    <FontAwesomeIcon icon={faRandom} size="lg" color={shuffleMode ? 'blue' : 'gray'} />
                                </button>
    
                                <div className="relative flex items-center justify-end ml-4 md:ml-10">
                                    <button
                                        onClick={toggleVolumePopup}
                                        className="mr-4 md:mr-10 text-lg"
                                        ref={volumeButtonRef}
                                    >
                                        <FontAwesomeIcon icon={volume === 0 ? faVolumeMute : faVolumeUp} size="lg" />
                                    </button>
    
                                    {volumePopupVisible && (
                                        <div
                                            className={`${styles[selectedStyle].volumePopup}`}
                                            style={{ right: '10px' }}
                                        >
                                            <div className={`${styles[selectedStyle].title} text-md font-semibold text-center mb-4`}>
                                                {Math.round(volume * 100)}%
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className={`${styles[selectedStyle].slider}`}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
    
                            <audio
                                ref={audioRef}
                                src={audioSrc}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={handleEndOfSong}
                            />
                        </>
                    )}
                </div>
    
                {/* Lista de reproducción */}
                {(filteredSongs.length > 0 || songList.length > 0) && (
                    <div
                        className={`${styles[selectedStyle].songList} w-full lg:w-76 h-full p-4 rounded-lg shadow-lg relative mt-6 lg:mt-0`} 
                        style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        <h3 className={`${styles[selectedStyle].title} text-md font-semibold text-center mb-4`}>Lista de reproducción</h3>
                        <ul>
                            {(searchQuery ? filteredSongs : songList).map((track, index) => {
                                const trackName = formatTrack(track); // Obtén el nombre de la canción
                                return (
                                    <li
                                        key={index}
                                        className={`${styles[selectedStyle].listItem} ${index === currentSongIndex ? styles[selectedStyle].activeListItem : ''} p-2 cursor-pointer`}
                                        onClick={() => handleSongClick(index)}
                                    >
                                        {trackName} {/* Muestra el nombre de la canción sin el efecto de neón */}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
    
            {/* Botón para cambiar estilos */}
            <div className="absolute bottom-0 right-1 p-2">
                <button
                    onClick={handleStylePopupToggle}
                    className="px-4 py-2 bg-gray-100 rounded-full shadow-lg text-lg border-2 border-gray-400"
                >
                    <FontAwesomeIcon icon={faPalette} size="lg" />
                </button>
    
                {showStylePopup && (
                    <div className="absolute bottom-16 right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
                        <div className="text-center mb-2 font-semibold">Seleccionar estilo</div>
                        <button
                            onClick={() => handleStyleChange('neumorphism')}
                            className="block px-4 py-2 text-center w-full hover:bg-gray-200"
                        >
                            Neumorfismo
                        </button>
                        <button
                            onClick={() => handleStyleChange('colorfull')}
                            className="block px-4 py-2 text-center w-full hover:bg-blue-200"
                        >
                            ColorFull
                        </button>
                        <button
                            onClick={() => handleStyleChange('cakecolor')}
                            className="block px-4 py-2 text-center w-full hover:bg-yellow-200"
                        >
                            Color Pastel
                        </button>
                        <button
                            onClick={() => handleStyleChange('retro')}
                            className="block px-4 py-2 text-center w-full 
                                hover:bg-gradient-to-r from-blue-900 to-blue-700">
                            <span className="text-pink-400 neon-text hover:text-white">Retro</span>
                        </button>
                        <button
                            onClick={() => handleStyleChange('mp3')}
                            className="block px-4 py-2 text-center w-full hover:bg-green-200"
                        >
                            MP3
                        </button>
                    </div>
                )}
            </div>
        </div>
    );    
        
    
};
