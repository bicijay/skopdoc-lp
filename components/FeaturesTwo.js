import {
    CameraIcon,
    DuplicateIcon,
    OfficeBuildingIcon,
    PencilAltIcon,
    SearchIcon,
    UsersIcon
} from "@heroicons/react/outline";
import { Navigation } from 'swiper';
import {Swiper, SwiperSlide} from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';

const features = [
    {
        name: 'Fotos por paciente',
        description: 'Organize fotos por perfil de paciente com uma busca simples e prática.',
        icon: UsersIcon,
        anim: '/featuresTwo/perfilAnim.mp4'
    },
    {
        name: 'Mapeamento de lesões',
        description: 'Mapeie lesões na pele do seu paciente e acompanhe suas evoluçoes.',
        icon: SearchIcon,
        anim: '/featuresTwo/marcacaoAnim.mp4'
    },
    {
        name: 'Comparativos',
        description: "Crie análises comparativas com fotos dos seus pacientes, adicione anotações e sua marca d'água.",
        icon: DuplicateIcon,
        anim: '/featuresTwo/comparacaoAnim.mp4'
    },
    {
        name: 'Foto Fantasma',
        description: 'Utilize a foto anterior como referência na hora de tirar uma nova foto da evolução.',
        icon: CameraIcon,
        anim: '/featuresTwo/foto-fantasma.png'
    },
    {
        name: 'Anotações',
        description: 'Adicione e tenha acesso a anotações em todas as fotos do paciente.',
        icon: PencilAltIcon,
        anim: '/featuresTwo/anotacaoAnim.mp4'
    },
    {
        name: 'Perfil compartilhado',
        description: 'Adicione múltiplos profissionais ao perfil da sua clínica.',
        icon: OfficeBuildingIcon,
        anim: '/featuresTwo/perfil-clinica.png'
    },
]

const FeaturesTwo = () => {
    return (
        <div className="bg-gray-50 overflow-hidden">

            <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-8">
                    <div className="lg:col-span-1">
                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            spaceBetween={50}
                            slidesPerView={1}

                        >
                            {features.map((feature, i) => (
                                <SwiperSlide key={i}>
                                    {feature.anim.includes('.mp4') ?
                                        <video width="70%" style={{margin: "0 auto"}} autoPlay={true}
                                               muted={true} loop={true} playsInline={true}>
                                            <source src={feature.anim}/>
                                        </video> :
                                        <img src={feature.anim}/>
                                    }
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <dl className="mt-10 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:mt-0 lg:col-span-2">
                        {features.map((feature) => (
                            <div key={feature.name} className="text-center md:text-left">
                                <dt>
                                    <div
                                        className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto lg:mx-0">
                                        <feature.icon className="h-6 w-6" aria-hidden="true"/>
                                    </div>
                                    <p className="mt-5 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 text-base text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );

}

export default FeaturesTwo;