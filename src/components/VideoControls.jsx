import React, { useState } from 'react';
import { BsPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { MdOutlineFullscreen, MdOutlineScreenSearchDesktop, MdKeyboardReturn } from 'react-icons/md';
import { IoSettingsOutline } from "react-icons/io5";
import { GoUnmute, GoMute } from "react-icons/go";

const formatTime = time => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);

	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
};

export const VideoControls = ({
	progress,
	duration,
	isPlaying,
	volume,
	isMuted,
	isFullscreen,
	togglePlay,
	handleVolumeChange,
	handlePlaybackRateChange,
	toggleFullScreen,
	handleProgressChange,
	handleFileChange,
	toggleMute
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [showSpeedOptions, setShowSpeedOptions] = useState(false);
	const [volumePercentage, setVolumePercentage] = useState(volume * 100);

	const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState);
	};

	const handleOptionClick = option => {
		if (option === 'speeds') {
			setShowSpeedOptions(true);
		}
	};

	const handleBackToMenu = () => {
		setShowSpeedOptions(false);
	};

	const handleVolumeChangeInternal = (event) => {
		const newVolume = parseFloat(event.target.value);
		setVolumePercentage(newVolume * 100); 
		handleVolumeChange(event);
	};

	return (
		<div className={`absolute bottom-0 left-0 w-full p-4 flex items-center bg-black bg-opacity-75 ${isPlaying ? 'hidden group-hover:flex' : ''}`}>

			<div className='flex items-center justify-between gap-3 w-full'>
				<button className='text-white focus:outline-none' onClick={togglePlay}>
					{isPlaying ? (
						<BsPauseFill size={24} />
					) : (
						<BsFillPlayFill size={24} />
					)}
				</button>

				<div className='flex items-center'>
					<span className='text-white mr-2'>
						{formatTime(progress)}
					</span>
					<div className='relative w-64 h-1.5 bg-gray-600 rounded-full mr-2'>
						<input
							type='range'
							className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
							min='0'
							max={duration}
							step={1}
							value={progress}
							onChange={handleProgressChange}
						/>
						<div
							className='absolute top-0 left-0 h-full bg-blue-500 rounded-full'
							style={{ width: `${(progress / duration) * 100}%` }}
						></div>
					</div>
					<span className='text-white mr-2'>
						{formatTime(duration)}
					</span>
				</div>

				<div className='flex items-center'>
					<button onClick={toggleMute} className="text-white mr-2">
							{isMuted ? <GoMute size={24} /> : <GoUnmute size={24} />}
						</button>
					<input
						type='range'
						className='w-16 h-1.5 bg-gray-600 rounded-full mr-2'
						min={0}
						max={1}
						step={0.1}
						value={volume}
						onChange={handleVolumeChangeInternal}
					/>
					<span className='text-white'>
						{Math.round(volumePercentage)}% 
					</span>
				</div>
				
				<div className='flex items-center'>

					<label className="text-white focus:outline-none bg-black-700 px-6 py-1 rounded-md cursor-pointer mr-2">
						<MdOutlineScreenSearchDesktop size={24} />
						<input 
							type='file' 
							accept='video/*' 
							onChange={handleFileChange} 
							className='hidden' 
						/>
					</label>

					<button className='text-white focus:outline-none mr-9' onClick={toggleMenu}>
						<IoSettingsOutline size={24} />
					</button>

					{isMenuOpen && (
							<div
								className={`absolute right-7 bg-black text-white rounded-lg shadow-lg p-2 w-32 transition-all duration-300 ${
									showSpeedOptions ? 'top-[-410%]' : 'top-[-158%]'}`}>
							{showSpeedOptions ? (
								<ul>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={handleBackToMenu}>
									<MdKeyboardReturn/>
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '0.25' } })}>
										0.25x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '0.5' } })}>
										0.5x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '0.75' } })}>
										0.75x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '1' } })}>
										1x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '1.25' } })}>
										1.25x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '1.5' } })}>
										1.5x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '1.75' } })}>
										1.75x
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handlePlaybackRateChange({ target: { value: '2' } })}>
										2x
									</li>
								</ul>
							) : (
								<ul>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer' onClick={() => handleOptionClick('speeds')}>
										Velocidades
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer'>
										Opción 2
									</li>
									<li className='text-sm py-1 px-2 hover:bg-gray-700 cursor-pointer'>
										Opción 3
									</li>
								</ul>
							)}
						</div>
					)}

					<button className='text-white focus:outline-none mr-2' onClick={toggleFullScreen}>
						<MdOutlineFullscreen size={24} />
					</button>
				</div>

			</div>

		</div>
	);
};
