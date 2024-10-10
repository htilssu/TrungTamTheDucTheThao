import GymManagement from "./GymManagement.jsx";

const GymLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <GymManagement/>
                </div>
            </div>
        </div>
    );
};

export default GymLayout;