const Map = () => {
    return (
        <div className="bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 mb-8 rounded-lg">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Vị Trí</h2>
            <iframe
                className="w-full h-72 rounded-md"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46971.02877981546!2d106.60497990379126!3d10.858656619368638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b088de30f3b%3A0xd2140740d360f705!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ2_huqFpIG5n4buvIC0gVGluIGjhu41jIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCAoSFVGTElUKSBDxqEgc-G7nyBIw7NjIE3DtG4!5e0!3m2!1svi!2s!4v1729528988555!5m2!1svi!2s"
                allowFullScreen=""
                loading="lazy"
                title="Bản đồ"
            ></iframe>
        </div>
    );
};

export default Map;
