
import ServiceEquipmentt from "./ServiceEquipment.jsx";

const EquipmentLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <ServiceEquipmentt/>
                </div>
            </div>
        </div>
    );
};

export default EquipmentLayout;