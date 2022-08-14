/* This example requires Tailwind CSS v2.0+ */
export default function DownloadApp() {
    return (
        <div className="bg-blue-700" id="download">
            <div className="flex flex-col max-w-2xl mx-auto text-center justify-center px-4 py-16 sm:py-16 sm:px-6 lg:px-8">

                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">Pronto para começar?</span>
                    <span className="block">Inicie seu teste grátis agora.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-200">
                    Clique no botão abaixo correspondente ao tipo do seu dispositivo.
                </p>

                <div className="mt-10 sm:flex justify-center">
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                            href="#"
                            className="w-full flex items-center justify-center"
                        >
                            <img src="/apple-store.png"/>
                        </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                            href="#"
                            className="w-full flex items-center justify-center"
                        >
                            <img src="/google-play.png"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}