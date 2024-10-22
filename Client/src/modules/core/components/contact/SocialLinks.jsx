
const SocialLinks = () => {
    return (
        <div className="mt-4 flex flex-col items-center">
            <h3 className="text-xl font-semibold">Theo dõi chúng tôi trên:</h3>
            <div className="flex space-x-4 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
                </a>
            </div>
        </div>
    );
};

export default SocialLinks;
