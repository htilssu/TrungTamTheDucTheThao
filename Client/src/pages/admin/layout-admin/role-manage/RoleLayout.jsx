import RolesUser from "./RolesUser.jsx";

const RoleLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <RolesUser/>
                </div>
            </div>
        </div>
    );
};

export default RoleLayout;