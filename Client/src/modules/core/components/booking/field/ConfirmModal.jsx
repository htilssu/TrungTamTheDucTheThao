import { Confirm } from 'react-admin';

const ConfirmModal = ({ isOpen, title, content, cancel, confirm, onConfirm, onClose }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <Confirm
                    isOpen={isOpen}
                    title={title}
                    content={content}
                    cancel={cancel}
                    confirm={confirm}
                    onConfirm={onConfirm}
                    onClose={onClose}
                />
            </div>
        )
    );
};

export default ConfirmModal;
