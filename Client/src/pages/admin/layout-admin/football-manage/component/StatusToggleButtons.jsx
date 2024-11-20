import { FaClock, FaPlay, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const StatusToggleButtons = ({ viewMode, setViewMode }) => {
    const statuses = [
        { id: 'PENDING', label: 'Đang Xử Lý', icon: <FaClock /> },
        { id: 'ACTING', label: 'Đang Diễn Ra', icon: <FaPlay /> },
        { id: 'COMPLETED', label: 'Đã Hoàn Thành', icon: <FaCheckCircle /> },
        { id: 'CANCEL', label: 'Đã Hủy', icon: <FaTimesCircle /> }
    ];

    return (
        <div className="mb-6 flex justify-center space-x-4">
            {statuses.map(({ id, label, icon }) => (
                <button
                    key={id}
                    onClick={() => setViewMode(id)}
                    className={`flex items-center justify-center gap-4 px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                        viewMode === id
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105 shadow-lg'
                            : 'bg-gray-300 text-gray-600 hover:bg-blue-400 hover:text-white hover:scale-105 hover:shadow-md'
                    }`}
                >
                    {icon}
                    {label}
                </button>
            ))}
        </div>
    );
};

export default StatusToggleButtons;