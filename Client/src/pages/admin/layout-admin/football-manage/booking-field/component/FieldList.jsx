const FieldList = ({ fields, selectedField, onSelectField }) => {
    const fieldList = Array.isArray(fields) ? fields : [];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chọn sân bóng:</h2>
            {fieldList.length === 0 ? (
                <p className="text-center text-lg text-red-500">Hiện tại không có sân bóng nào để chọn. Vui lòng thử lại sau.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {fieldList.map((field) => (
                        <button
                            key={field.id}
                            onClick={() => onSelectField(field.id)}
                            className={`w-full py-3 px-6 rounded-lg text-lg font-medium transition-all duration-300 
                                ${selectedField === field.id ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-800'}
                                hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        >
                            {field.fieldName}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FieldList;