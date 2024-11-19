import { FaClock, FaPlay, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const StatusSelectionButtons = ({ activeStatus, setActiveStatus }) => {
    const statuses = [
        { id: 'pending', label: 'Pending', icon: <FaClock /> },
        { id: 'acting', label: 'Acting', icon: <FaPlay /> },
        { id: 'confirmed', label: 'Completed', icon: <FaCheckCircle /> },
        { id: 'cancelled', label: 'Cancelled', icon: <FaTimesCircle /> }
    ];

    return (
        <div className="flex justify-center mb-6 space-x-4">
            {statuses.map((status) => (
                <button
                    key={status.id}
                    onClick={() => setActiveStatus(status.id)}
                    className={`
                        flex items-center justify-center gap-2 px-6 py-3 
                        rounded-full font-semibold text-lg transition-all duration-300 transform 
                        ${
                        activeStatus === status.id
                            ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-xl scale-105'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:shadow-lg hover:scale-105'
                    }
                    `}
                >
                    {status.icon}
                    {status.label}
                </button>
            ))}
        </div>
    );
};

export default StatusSelectionButtons;