import React from 'react';

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex z-20 justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Thông Báo</h2>
                <p>{message}</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
