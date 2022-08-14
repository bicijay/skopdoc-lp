const features = [
    {
        name: 'Dermatoscopia',
        description: 'Imagens dermatoscópicas integradas ao mapeamento corporal.',
        image: '/features/dermatoscopy.jpg',
    },
    {
        name: 'Tricoscopia',
        description: 'Organize imagens geradas pelo mapeamento digital do couro cabeludo.',
        image: '/features/tricoscopia.png',
    },
    {
        name: 'Documentação Fotográfica',
        description: 'Documente e anote imagens de procedimentos estéticos, cirúgicos e evoluções.',
        image: '/features/documentacao.png',
    },
    {
        name: 'Mapeamento Corporal',
        description: 'Realize marcações em áreas de interesse no corpo do paciente e relacione-as com fotos ampliadas.',
        image: '/features/mapeamento.png',
    },
    {
        name: 'Estética',
        description: 'Acompanhe resultados de procedimentos estéticos com recursos de comparação.',
        image: '/features/estetica.png',
    },
    {
        name: 'Análises Comparativas',
        description: 'Crie análises comparativas de lesões, procedimentos estéticos, cirúgicos, entre outras.',
        image: '/features/antes-depois.png',
    },
]

const Features = () => {

    return (
        <div id="recursos" className="relative bg-white py-16 sm:py-24 lg:py-24">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-base font-semibold uppercase tracking-wider text-blue-600">VALOR AGREGADO</h2>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    Áreas de aplicação do Skopdoc
                </p>
                <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
                    Algumas das áreas chaves para utilização e aproveitamento de todas as funcionalidades do app.
                </p>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="pt-6 flex flex-col">
                                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8 flex-1">
                                    <div className="-mt-6">
                                        <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-blue-500 overflow-hidden shadow-lg">
                        <img className="object-cover w-24 h-24" src={feature.image}/>
                      </span>
                                        </div>
                                        <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                                        <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Features;