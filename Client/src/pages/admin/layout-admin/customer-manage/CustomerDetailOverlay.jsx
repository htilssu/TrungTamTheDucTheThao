import React from 'react';
import CustomerDetail from './DetailCustomer';

const CustomerDetailOverlay = ({ customer, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-4xl">
                <button
                    className="absolute top-0 right-0 m-4 bg-red-500 text-white p-2 rounded-full"
                    onClick={onClose}
                >
                    X
                </button>
                <CustomerDetail customer={customer} />
            </div>
        </div>
    );
};

export default CustomerDetailOverlay;
