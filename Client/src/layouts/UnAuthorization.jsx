import { useNavigate } from 'react-router-dom';

const UnAuthorization = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="min-h-screen flex items-center justify-center px-4 relative"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center relative">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-100/80 p-4 rounded-full animate-pulse">
                        {/* Icon Lock */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-16 w-16 text-red-600"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                            />
                        </svg>
                    </div>
                </div>

                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Truy Cập Bị Từ Chối
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Bạn không có quyền truy cập vào trang này. 
                        Vui lòng liên hệ quản trị viên nếu bạn nghĩ đây là một lỗi.
                    </p>
                </div>

                <div className="space-y-4">
                    <button 
                        onClick={() => navigate('/')}
                        className="group w-full flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-full 
                        transition-all duration-300 ease-in-out transform hover:scale-105 
                        hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 mr-2 transform group-hover:scale-110 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                            />
                        </svg>
                        Quay Về Trang Chủ
                    </button>

                    <button 
                        onClick={() => window.history.back()}
                        className="group w-full flex items-center justify-center bg-gray-100 text-gray-800 py-3 px-6 rounded-full 
                        transition-all duration-300 ease-in-out transform hover:scale-105
                        hover:bg-gray-200 hover:shadow-lg hover:shadow-gray-500/30
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 mr-2 transform group-hover:translate-x-[-4px] transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                            />
                        </svg>
                        Quay Lại Trang Trước
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Cần trợ giúp? 
                        <a 
                            href="/contact" 
                            className="ml-1 text-blue-600 hover:text-blue-800 font-semibold
                            transition-all duration-300 hover:underline hover:decoration-2 hover:underline-offset-4"
                        >
                            Liên hệ hỗ trợ
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UnAuthorization;