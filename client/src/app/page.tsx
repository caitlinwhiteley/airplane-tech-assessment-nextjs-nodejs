import FormAndResults from './FormAndResults';
import Footer from './common/Footer';
import Header from './common/Header';

export default function Page() {
    return (
        <div className="min-h-screen justify-between flex flex-col">
            <Header />
            <main className="flex-1 max-w-2xl flex-col items-center">
                <p className="intro-p">
                    This is a website to find planes in the sky. Use the form
                    below to search for all planes flying in to or out of a
                    sepcified airport within a certain time frame. There is also
                    the option to search for all flights with a chosen time
                    frame.
                </p>
                <FormAndResults />
            </main>
            <Footer />
        </div>
    );
}
