import React, { useState } from 'react';
import { Recycle, Trash2, Battery, Leaf, BookOpen, Lightbulb, BrainCircuit } from 'lucide-react';

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon, color }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${color}`}>
    <div className="p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-xl font-semibold ml-3 text-gray-800 dark:text-white">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const InfoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'ml' | 'tips'>('categories');

  const tabs = [
    {
      id: 'categories',
      label: 'Categorías',
      icon: <Recycle className="w-5 h-5" />,
    },
    {
      id: 'ml',
      label: 'Tecnología',
      icon: <BrainCircuit className="w-5 h-5" />,
    },
    {
      id: 'tips',
      label: 'Consejos',
      icon: <Lightbulb className="w-5 h-5" />,
    },
  ];

  return (
    <section id="info" className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Aprende sobre Clasificación de Residuos
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Descubre cómo nuestro sistema clasifica los distintos tipos de residuos y aprende a gestionar tus desechos de manera responsable.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-green-500 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard
              title="Reciclables"
              description="Incluye papel, cartón, plásticos PET/HDPE, vidrio, aluminio y metales. Estos materiales pueden procesarse y convertirse en nuevos productos, reduciendo la necesidad de materias primas."
              icon={<Recycle className="w-8 h-8 text-blue-500" />}
              color="border-l-4 border-blue-500"
            />
            <InfoCard
              title="Orgánicos"
              description="Restos de comida, cáscaras, café, hojas y otros materiales biodegradables. Se pueden compostar para crear abono natural rico en nutrientes para plantas y jardines."
              icon={<Leaf className="w-8 h-8 text-green-500" />}
              color="border-l-4 border-green-500"
            />
            <InfoCard
              title="Peligrosos"
              description="Baterías, productos químicos, medicamentos caducados, pinturas, aceites. Requieren procesamiento especial para evitar contaminar el medio ambiente o afectar la salud pública."
              icon={<Battery className="w-8 h-8 text-yellow-500" />}
              color="border-l-4 border-yellow-500"
            />
            <InfoCard
              title="No Reciclables"
              description="Algunos plásticos mixtos, productos de higiene usados, ciertos envoltorios metalizados. Actualmente tienen limitaciones técnicas o económicas para su reciclaje."
              icon={<Trash2 className="w-8 h-8 text-gray-500" />}
              color="border-l-4 border-gray-500"
            />
          </div>
        )}

        {activeTab === 'ml' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Inteligencia Artificial en la Clasificación</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                  <BrainCircuit className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Redes Neuronales Convolucionales</h4>
                  <p className="text-gray-600 dark:text-gray-300">Nuestro sistema utiliza modelos avanzados de visión por computadora para identificar características visuales de diferentes tipos de residuos.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Entrenamiento con Millones de Imágenes</h4>
                  <p className="text-gray-600 dark:text-gray-300">El modelo ha sido entrenado con datasets extensos de diferentes tipos de residuos para reconocer patrones y características específicas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Mejora Continua</h4>
                  <p className="text-gray-600 dark:text-gray-300">El sistema aprende constantemente de nuevas imágenes y feedback de usuario, mejorando su precisión con el tiempo.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Proceso de Clasificación</h4>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>La imagen es preprocesada para normalizar su tamaño y contraste</li>
                <li>Se extraen características visuales clave mediante CNN</li>
                <li>El modelo compara estas características con su base de conocimiento</li>
                <li>Se calcula la probabilidad para cada categoría posible</li>
                <li>Se presenta el resultado con el nivel de confianza asociado</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Consejos para Gestión de Residuos</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-green-500 mb-2">Reduce</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Compra productos con menos embalaje</li>
                  <li>Utiliza bolsas y envases reutilizables</li>
                  <li>Evita productos de un solo uso</li>
                  <li>Opta por versiones digitales en lugar de papel</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-blue-500 mb-2">Reutiliza</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Da un segundo uso a envases y recipientes</li>
                  <li>Repara objetos en lugar de desecharlos</li>
                  <li>Dona artículos que ya no necesitas</li>
                  <li>Considera la compra de segunda mano</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-purple-500 mb-2">Recicla Correctamente</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Limpia los envases antes de reciclarlos</li>
                  <li>Separa diferentes materiales (papel, plástico, vidrio)</li>
                  <li>Infórmate sobre las reglas locales de reciclaje</li>
                  <li>No mezcles residuos peligrosos con reciclables</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-500 mb-2">Compostaje</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                  <li>Inicia un compostaje casero para residuos orgánicos</li>
                  <li>Utiliza el compost para tus plantas o jardín</li>
                  <li>Incluye restos de frutas, verduras y café</li>
                  <li>Evita incluir carnes, lácteos o alimentos cocinados</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfoSection;