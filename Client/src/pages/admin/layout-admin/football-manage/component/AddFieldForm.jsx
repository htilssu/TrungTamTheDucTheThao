import {useState} from "react";
import {TiDelete} from "react-icons/ti";
import {TextField} from "@mui/material";
import {toast} from "react-toastify";
import {queryClient} from "../../../../../modules/cache.js";
import DotLoader from "react-spinners/DotLoader.js";
import {wPost} from "../../../../../utils/request.util.js";

const AddFieldForm = ({onAddField, onClose}) => {
    const [loading, setLoading] = useState(false);

    const [newField, setNewField] = useState({
        field_name: "",
        field_type: "5v5",
        priceSchedule: [{start_time: "", end_time: "", rate: ""}],
        location: "",
        status: "active",
        description: "",
        images: "/sanbong2.png",
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [errors, setErrors] = useState({}); // State để theo dõi các lỗi

    // Xử lý thay đổi giá theo khung giờ
    const handlePriceScheduleChange = (index, field, value) => {
        const updatedPriceSchedule = [...newField.priceSchedule];
        updatedPriceSchedule[index][field] = value;
        setNewField({...newField, priceSchedule: updatedPriceSchedule});
    };

    // Thêm khung giờ mới
    const handleAddPriceSchedule = () => {
        setNewField({
            ...newField,
            priceSchedule: [...newField.priceSchedule, {start_time: "", end_time: "", rate: ""}],
        });
    };

    // Xử lý file ảnh khi tải lên nhiều ảnh
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setNewField({...newField, images: [...newField.images, ...files]});

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]);
    };

    // Xóa ảnh
    const handleImageRemove = (index) => {
        const updatedImages = [...newField.images];
        const updatedPreviews = [...imagePreviews];

        updatedImages.splice(index, 1);
        updatedPreviews.splice(index, 1);

        setNewField({...newField, images: updatedImages});
        setImagePreviews(updatedPreviews);
    };

    const validateFieldData = (newField) => {
        let formErrors = {};
        if (!newField.field_name) formErrors.field_name = "Nhập tên sân!";
        if (!newField.location) formErrors.location = "Nhập địa chỉ sân!.";
        newField.priceSchedule.forEach((schedule, index) => {
            if (!schedule.start_time || !schedule.end_time || !schedule.rate) {
                formErrors[`priceSchedule_${index}`] = "Vui lòng điền đầy đủ thông tin giá và khung giờ.";
            } else if (schedule.start_time >= schedule.end_time) {
                formErrors[`priceSchedule_${index}`] = "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc.";
            }
        });
        return formErrors;
    };

    // Xử lý thêm sân mới
    const handleAddField = async () => {
        setLoading(true);
        // Sử dụng hàm validate để kiểm tra dữ liệu
        const formErrors = validateFieldData(newField);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        //hiện tại chỉ thêm được 1 ảnh
        let imageUrl = '';
        if (newField.images.length > 0 && newField.images[0] instanceof File) {
            imageUrl = URL.createObjectURL(newField.images[0]);
        }

        const fieldData = {
            field: {
                fieldName: newField.field_name,
                location: newField.location,
                fieldType: newField.field_type,
                status: "active",
                description: newField.description,
                imageUrl: "/sanbong2.png",
            },
            prices: newField.priceSchedule.map((schedule) => ({
                startTime: schedule.start_time,
                endTime: schedule.end_time,
                rate: parseFloat(schedule.rate),
            }))
        };

        try {
            const response = await wPost("/v1/fields", fieldData);
            const data = await response.json();
            const timeoutId = setTimeout(() => {

                toast.success('Thêm sân thành công!');
                if (onAddField) onAddField(data);
                queryClient.invalidateQueries({queryKey: ['fields']});
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timeoutId);
        } catch (error) {
            console.error("Error adding field:", error);
            toast.error("Đã xảy ra lỗi khi thêm sân. Vui lòng kiểm tra lại dữ liệu nhập.");
        }
    };

    // Xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewField({...newField, [name]: value});
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold mb-4">Thêm Sân Bóng Mới</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <TextField
                    className="p-2 border rounded"
                    type="text"
                    label="Tên sân"
                    name="field_name"
                    value={newField.field_name}
                    onChange={handleInputChange}
                    error={!!errors.field_name}
                    helperText={errors.field_name}
                />
                <select
                    className="p-2 border rounded"
                    name="field_type"
                    value={newField.field_type}
                    onChange={handleInputChange}
                >
                    <option value="5v5">Sân 5 người</option>
                    <option value="7v7">Sân 7 người</option>
                    <option value="11v11">Sân 11 người</option>
                </select>
                <TextField
                    className="p-2 border rounded"
                    type="text"
                    label="Địa chỉ"
                    name="location"
                    value={newField.location}
                    onChange={handleInputChange}
                    error={!!errors.location}
                    helperText={errors.location}
                />
                <TextField
                    className="p-2 border rounded"
                    label="Mô tả sân"
                    name="description"
                    value={newField.description}
                    onChange={handleInputChange}
                />
            </div>

            {/* Phần thêm giá theo khung giờ */}
            <h4 className="text-xl font-semibold mb-4">Giá theo khung giờ</h4>
            {newField.priceSchedule.map((schedule, index) => (
                <div className="grid grid-cols-3 gap-4 mb-2" key={index}>
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Từ"
                        value={schedule.start_time}
                        onChange={(e) =>
                            handlePriceScheduleChange(index, "start_time", e.target.value)
                        }
                    />
                    <input
                        className="p-2 border rounded"
                        type="time"
                        placeholder="Đến"
                        value={schedule.end_time}
                        onChange={(e) => handlePriceScheduleChange(index, "end_time", e.target.value)}
                    />
                    <TextField
                        className="p-2 border rounded"
                        type="number"
                        label="Giá theo giờ (VNĐ)"
                        value={schedule.rate}
                        onChange={(e) => handlePriceScheduleChange(index, "rate", e.target.value)}
                        error={!!errors[`priceSchedule_${index}`]}
                        helperText={errors[`priceSchedule_${index}`]}
                    />
                </div>
            ))}
            <button
                className="bg-gray-500 text-white py-1 px-2 rounded mb-4"
                onClick={handleAddPriceSchedule}
            >
                Thêm khung giờ
            </button>

            {/* Tải nhiều ảnh lên */}
            <div className="mb-4">
                <h4 className="text-xl font-semibold mb-2">Tải ảnh sân lên</h4>
                <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="p-2 border rounded"
                />
                <div className={"flex justify-center items-center mt-2"}>
                    {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="w-32 h-32 object-cover"
                                    />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        onClick={() => handleImageRemove(index)}
                                    >
                                        <TiDelete/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Nút thêm sân */}
            {/* Xác nhận đặt sân */}
            <div className="flex justify-center">
                {loading ? (
                    <DotLoader color="#3bd773" size={40}/>
                ) : (
                    <button
                        className="bg-green-500 text-white py-2 px-4 rounded"
                        onClick={handleAddField}
                    >
                        Thêm Sân
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddFieldForm;
