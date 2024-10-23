import ContactInfo from "./ContactInfo.jsx";
import ContactForm from "./ContactForm.jsx";
import FAQ from "./FAQ.jsx";
import Map from "./Map.jsx";

const ContactPage = () => {
    return (
        <>
            <div className="bg-gray-100">
                <div className="container mx-auto px-4 py-10">
                    <div>
                        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Liên Hệ Chúng Tôi</h1>
                    </div>
                    <ContactInfo/>
                    <Map/>

                    <FAQ />
                    <ContactForm />
                </div>
            </div>
        </>
    );
}

export default ContactPage;