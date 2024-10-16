import '../styles/Styles.css'; // Asegúrate de que la ruta sea correcta

const styles = {
    neumorphism: {
        player: 'bg-gray-200 p-8 rounded-lg shadow-lg neumorphism mb-6',
        button: 'px-8 py-4 rounded-full shadow-inner bg-gray-300 neumorphism-button text-lg',
        slider: 'w-full mb-6 neumorphism-slider',
        volumePopup: 'absolute top-[-100px] right-0 bg-white border border-gray-300 rounded-lg p-2 shadow-lg min-w-[100px]',
        songList: 'bg-white p-6 rounded-lg shadow-inner border-2 border-gray-400',
        listItem: 'py-2 cursor-pointer text-gray-600 text-center hover:bg-gray-200',
        activeListItem: 'text-blue-500 font-bold text-center',
        defaultTime: 'default-time' // Clase para el tiempo por defecto
    },
    colorfull: {
        player: 'bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 p-8 rounded-lg shadow-xl retro mb-6 border-2 border-blue-500',
        button: 'px-8 py-4 rounded-full bg-yellow-400 text-blue-800 shadow-lg border-2 border-blue-600 retro-button text-lg',
        slider: 'w-full mb-6 bg-gray-800 h-2 rounded-full retro-slider',
        volumePopup: 'absolute top-[-100px] right-0 bg-black border border-yellow-500 rounded-lg p-2 shadow-lg retro-volume-popup min-w-[100px]',
        songList: 'bg-gray-900 p-6 text-white rounded-lg shadow-xl retro-song-list border-2 border-blue-400',
        listItem: 'py-2 cursor-pointer text-yellow-300 text-center hover:bg-green-800',
        activeListItem: 'text-pink-300 font-bold text-center',
        defaultTime: 'default-time' // Clase para el tiempo por defecto
    },
    cakecolor: {
        player: 'bg-yellow-100 p-8 rounded-lg shadow-xl border-4 border-pink-500 mb-6',
        button: 'px-8 py-4 rounded-full bg-pink-400 text-white font-bold text-lg border-2 border-yellow-500 shadow-xl',
        slider: 'w-full mb-6 bg-pink-300 rounded-lg',
        volumePopup: 'absolute top-[-100px] right-0 bg-yellow-300 border border-pink-400 rounded-lg p-2 shadow-xl min-w-[100px]',
        songList: 'bg-yellow-200 p-6 rounded-lg border-2 border-pink-400 shadow-xl',
        listItem: 'py-2 cursor-pointer text-pink-600 text-center hover:bg-pink-200',
        activeListItem: 'text-pink-700 font-bold text-center',
        defaultTime: 'default-time' // Clase para el tiempo por defecto
    },
    retro: {
        player: 'bg-gradient-to-r from-blue-900 to-blue-700 p-8 rounded-lg shadow-2xl mb-6 neon-border',
        button: 'px-8 py-4 rounded-full shadow-lg bg-blue-500 text-lg border-2 border-blue-700 hover:bg-blue-600 hover:border-blue-800 neon-text',
        slider: 'w-full mb-6 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full',
        volumePopup: 'absolute top-[-105px] right-0 bg-gradient-to-r from-blue-900 to-blue-600 neon-border rounded-lg p-2 shadow-lg min-w-[100px]',
        songList: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-6 text-white rounded-lg shadow-lg neon-border',
        listItem: 'py-2 cursor-pointer text-pink-300 text-center hover:text-white neon-text',
        activeListItem: 'text-yellow-500 font-bold text-center neon-text',
        title: 'neon-title text-md font-semibold text-center mb-4',
        neonTime: 'neon-time'
    },
    mp3: {
        player: 'relative bg-gray-400 p-6 rounded-lg shadow-lg border-t-4 border-b-4 border-white border-l-2 border-r-2 border-gray-700 mb-6',
        button: 'px-6 py-3 rounded-lg bg-orange-500 text-white border-2 border-orange-600 hover:bg-orange-400 transition-colors duration-300',
        slider: 'w-full mb-6 h-2 bg-gray-600 rounded-full',
        volumePopup: 'absolute top-[-100px] right-0 bg-gray-400 border border-gray-500 rounded-lg p-2 shadow-lg min-w-[100px]',
        songList: 'bg-blue-300 bg-opacity-60 p-6 rounded-lg border-4 border-gray-600 shadow-lg',
        listItem: 'py-2 cursor-pointer text-gray-800 text-center hover:bg-blue-400 transition-colors duration-300',
        activeListItem: 'text-yellow-100 font-bold text-center',
        title: 'text-xl font-bold text-center text-white mb-4',
        neonTime: 'text-black-500',
    },
    
    
    // Puedes agregar más estilos aquí para otros temas
};

export default styles;
