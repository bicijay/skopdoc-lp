import {StarIcon} from "@heroicons/react/solid";
import Banner from "./Banner";

const Hero = () => {

    return (
        <div className="w-100 bg-bg-gray">
            <div className="mx-auto max-w-7xl lg:relative bg-bg-gray">
                <div className="mx-auto max-w-7xl w-full pt-8 pb-20 text-center lg:py-48 lg:text-left">
                    <div className="px-4 lg:w-3/5 sm:px-8 xl:pr-32 lg:-mt-16">
                        <div className="inline-flex items-center divide-x divide-gray-300">
                            <div className="flex-shrink-0 flex pr-3">
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                                <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true"/>
                            </div>
                            <div className="min-w-0 flex-1 pl-3 py-1 text-sm text-gray-500 sm:py-3">
                                <span className="font-medium text-gray-900">Avaliado em 5 estrelas</span> por{' '}
                                <span className="font-medium text-blue-600">profissionais no beta</span>
                            </div>
                        </div>


                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl mt-6">
                            <span className="block text-blue-600 xl:inline">Organize imagens</span>{' '}
                            <span className="block xl:inline">dos seus pacientes</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
                            O Skopdoc te ajuda a organizar suas imagens por paciente, mapear lesões na pele, criar
                            comparativos e acompanhar evoluções.
                        </p>
                        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <a
                                    href="#download"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-md md:px-10"
                                >
                                    Faça um teste grátis
                                </a>
                            </div>
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                                <a
                                    onClick={() => $crisp?.push(["do", "chat:open"])}
                                    href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-md md:px-10"
                                >
                                    Entrar em contato
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/5 lg:py-16">
                    <video autoPlay={true} muted={true} loop={true} playsInline={true}>
                        <source src="/hero-anim.mp4"/>
                    </video>
                </div>
            </div>
        </div>
    );

}

export default Hero;