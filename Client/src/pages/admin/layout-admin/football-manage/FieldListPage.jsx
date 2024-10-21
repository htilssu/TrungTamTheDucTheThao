import { useState, useEffect } from "react";
import FieldList from "./FieldList.jsx";
import AddFieldForm from "./AddFieldForm.jsx";
import axios from "axios";

const FieldListPage = () => {
    const [fields, setFields] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get("http://localhost:8080/v1/fields");
                setFields(response.data);
            } catch (err) {
                console.error("Error fetching fields:", err);
                setError("Failed to load fields.");
            } finally {
                setLoading(false);
            }
        };

        fetchFields();
    }, []);

    // Thêm Sân
    const handleAddField = (newField) => {
        setFields((prevFields) => [...prevFields, { ...newField, id: prevFields.length + 1 }]);
    };

    // Lọc theo loại sân
    const filterFieldsByType = (type) => {
        return fields.filter((field) => field.fieldType === type);
    };

    return (
        <div className="container mx-auto p-6">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-6 hover:bg-blue-600"
                onClick={() => setShowAddForm((prev) => !prev)}
            >
                {showAddForm ? "Hủy thêm sân" : "Thêm Sân Bóng"}
            </button>

            {showAddForm && <AddFieldForm onAddField={handleAddField} onClose={() => setShowAddForm(false)}/>}

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">Danh Sách Sân Bóng</h3>

                {loading && <p>Đang tải danh sách sân...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Sân 5 người */}
                <h4 className="text-xl font-semibold mb-4">Sân 5 Người</h4>
                {filterFieldsByType("5v5").length > 0 ? (
                    <FieldList fields={filterFieldsByType("5v5")} />
                ) : (
                    <p>Không có sân 5 người nào.</p>
                )}

                {/* Sân 7 người */}
                <h4 className="text-xl font-semibold mb-4 mt-6">Sân 7 Người</h4>
                {filterFieldsByType("7v7").length > 0 ? (
                    <FieldList fields={filterFieldsByType("7v7")} />
                ) : (
                    <p>Không có sân 7 người nào.</p>
                )}

                {/* Sân 11 người */}
                <h4 className="text-xl font-semibold mb-4 mt-6">Sân 11 Người</h4>
                {filterFieldsByType("11v11").length > 0 ? (
                    <FieldList fields={filterFieldsByType("11v11")} />
                ) : (
                    <p>Không có sân 11 người nào.</p>
                )}
            </div>
        </div>
    );
};

export default FieldListPage;
