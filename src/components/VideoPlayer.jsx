import React, { useCallback, useEffect, useRef, useState } from 'react';
import { VideoControls } from './VideoControls';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

export const VideoPlayer = ({ src, handleFileChange }) => {
	const navigate = useNavigate();
	const videoRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [playbackRate, setPlaybackRate] = useState(1);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [progress, setProgress] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [showButton, setShowButton] = useState(true);

	useEffect(() => {
		const video = videoRef.current;

		const handleTimeUpdate = () => setProgress(video.currentTime);
		const handleDurationChange = () => setDuration(video.duration);

		video.addEventListener('timeupdate', handleTimeUpdate);
		video.addEventListener('durationchange', handleDurationChange);

		return () => {
			video.removeEventListener('timeupdate', handleTimeUpdate);
			video.removeEventListener('durationchange', handleDurationChange);
		};
	}, []);

	const togglePlay = useCallback(() => {
		const video = videoRef.current;

		if (video.paused) {
			video.play();
			setIsPlaying(true);
		} else {
			video.pause();
			setIsPlaying(false);
		}
	}, []);

	const handleVolumeChange = useCallback((e) => {
		const newVolume = e.target.value;

		videoRef.current.volume = newVolume;
		setVolume(newVolume);

		if (newVolume > 0) {
			setIsMuted(false);
		}
	}, []);

	const handlePlaybackRateChange = useCallback((e) => {
		const newPlaybackRate = e.target.value;
		videoRef.current.playbackRate = newPlaybackRate;
		setPlaybackRate(newPlaybackRate);
	}, []);

	const toggleMute = useCallback(() => {
		const video = videoRef.current;

		if (isMuted) {
			video.volume = volume; // Restaurar el volumen anterior
		} else {
			video.volume = 0; // Mutear el audio
		}
		setIsMuted(!isMuted);
	}, [isMuted, volume]);

	const toggleFullScreen = useCallback(() => {
		const video = videoRef.current;

		if (!isFullscreen) {
			if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen();
			} else if (video.msRequestFullscreen) {
				video.msRequestFullscreen();
			}
		} else {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else if (document.webkitRequestFullscreenElement) {
				document.webkitExitFullscreen();
			} else if (document.msRequestFullscreenElement) {
				document.msExitFullscreen();
			} else if (document.mozRequestFullscreenElement) {
				document.mozCancelFullscreen();
			}
		}

		setIsFullscreen(!isFullscreen);
	}, [isFullscreen]);

	const handleProgressChange = useCallback((e) => {
		const newProgress = e.target.value;
		videoRef.current.currentTime = newProgress;
		setProgress(newProgress);
	}, []);

	const handleMouseEnter = () => {
		setShowButton(true);
	};

	const handleMouseLeave = () => {
		setShowButton(false);
	};

	return (
		<div
			className='relative flex flex-col items-center'
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{/* Botón para regresar al menú principal */}
			{showButton && (
				<button
					onClick={() => navigate('/')}
					className="absolute top-4 left-4 bg-white text-black rounded p-2 z-10"
					title="Regresar al Menú"
				>
					<IoMdArrowRoundBack />
				</button>
			)}

			<div className='relative border shadow-2xl shadow-black rounded-md overflow-hidden w-full max-w-[900px] h-[500px] drop-shadow-sm group'>
				<video
					src={src}
					className='w-full h-full object-cover'
					ref={videoRef}
					onClick={togglePlay}
				></video>

				<VideoControls
					// Estados
					progress={progress}
					duration={duration}
					isPlaying={isPlaying}
					volume={volume}
					playbackRate={playbackRate}
					isFullscreen={isFullscreen}
					isMuted={isMuted}
					
					// Funciones del Reproductor
					togglePlay={togglePlay}
					handleVolumeChange={handleVolumeChange}
					handlePlaybackRateChange={handlePlaybackRateChange}
					toggleFullScreen={toggleFullScreen}
					handleProgressChange={handleProgressChange}
					handleFileChange={handleFileChange}
					toggleMute={toggleMute}
				/>
			</div>
		</div>
	);
};
