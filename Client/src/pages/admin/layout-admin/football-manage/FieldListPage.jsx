import { useState } from "react";
import FieldList from "./component/FieldList.jsx";
import AddFieldForm from "./component/AddFieldForm.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {wGet} from "../../../../utils/request.util.js";

// Hàm fetch dữ liệu
const fetchFields = async () => {
    const response = await wGet("/v1/fields");
    return response ?? [];
};

const FieldListPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const queryClient = useQueryClient();

    // Sử dụng useQuery để fetch dữ liệu
    const { data: fields = [], isLoading, isError, error } = useQuery({
        queryKey: ['fields'],
        queryFn: fetchFields,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    // Thêm Sân
    const handleAddField = (newField) => {
        queryClient.setQueryData(['fields'], (oldFields) => [
            ...oldFields,
            { ...newField, id: oldFields.length + 1 },
        ]);
    };

    // Lọc theo loại sân
    const filterFieldsByType = (type) => {
        return fields.filter((field) => field.fieldType === type);
    };

    return (
        <div className="container mx-auto px-6">
            <button
                className="bg-emerald-500 text-white py-2 px-4 rounded mb-6 hover:bg-emerald-400"
                onClick={() => setShowAddForm((prev) => !prev)}
            >
                {showAddForm ? "Hủy thêm sân" : "Thêm Sân Bóng"}
            </button>

            {showAddForm && <AddFieldForm onAddField={handleAddField} onClose={() => setShowAddForm(false)}/>}

            <div className="bg-white px-6 py-4 mb-6 rounded-lg shadow-md">
                <h3 className="text-3xl text-center font-semibold mb-4">Danh Sách Sân Bóng</h3>

                {isLoading && <p>Đang tải danh sách sân...</p>}
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
