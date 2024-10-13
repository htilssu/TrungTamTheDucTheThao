import ServiceManagementController from "./ServiceManagementController.jsx";

const PostLayout = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-100 p-6">
                <div>
                    {/*Chia nhỏ Component rồi vào đây để dễ quản lý không code quá nhiều trong Layout này.*/}
                    <ServiceManagementController/>
                </div>
            </div>
        </div>
    );
};

export default PostLayout;