import PropTypes from 'prop-types';

const ConfirmDeleteModal = ({ isOpen, onDelete, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-bold mb-4">Bạn có chắc muốn xóa phòng này không?</h3>
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={onDelete}>
                        Xóa
                    </button>
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded" onClick={onCancel}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default ConfirmDeleteModal;