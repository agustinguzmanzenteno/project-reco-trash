import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image, Camera, Trash, X } from 'lucide-react';
import Webcam from 'react-webcam';
import { traducirEtiqueta } from '../utils/helpers';

interface UploadSectionProps {
  onClassificationComplete: (prediction: string, confidence: number, imageUrl: string) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onClassificationComplete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Por favor, sube solo imágenes');
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClassify = async (imageData: string | File) => {
    const formData = new FormData();
    
    if (imageData instanceof File) {
      formData.append('imagen', imageData);
    } else {
      // Convert base64 to blob
      const response = await fetch(imageData);
      const blob = await response.blob();
      formData.append('imagen', blob, 'webcam-capture.jpg');
    }

    setIsLoading(true);
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 200);

    try {
      const res = await fetch('http://localhost:3000/predecir', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const prediction = traducirEtiqueta(data.label.toUpperCase());
      const confidence = parseFloat(data.confidence.toFixed(2));
      onClassificationComplete(prediction, confidence, imageData instanceof File ? preview! : imageData);
    } catch (err) {
      console.error(err);
      onClassificationComplete('ERROR', 0, imageData instanceof File ? preview! : imageData);
    } finally {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      handleClassify(imageSrc);
    }
  }, [webcamRef]);

  const toggleWebcam = () => {
    setIsWebcamActive(!isWebcamActive);
    if (image) {
      handleRemoveImage();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload" className="py-8 md:py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Clasifica tu Residuo
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Sube una imagen o usa la cámara para clasificar el residuo y nuestro sistema de inteligencia artificial te dirá a qué categoría pertenece.
        </p>
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        {isWebcamActive ? (
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-black">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-center">
              <button
                onClick={toggleWebcam}
                className="p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={captureImage}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Clasificando...' : 'Capturar y Clasificar'}
              </button>
            </div>
            {isLoading && (
              <div className="absolute bottom-16 left-0 right-0 px-4">
                <div className="w-full bg-black/30 rounded-full h-4 relative">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm text-white font-semibold">
                    {progress}%
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : !preview ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200 ${
              isDragging
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : 'border-gray-300 hover:border-green-400 dark:border-gray-600 dark:hover:border-green-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            <Upload className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Arrastra o haz clic para subir
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Formatos soportados: JPG, PNG, WEBP
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center">
                <Image className="w-5 h-5 mr-2 text-green-500" />
                Seleccionar Imagen
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWebcam();
                }}
                className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center"
              >
                <Camera className="w-5 h-5 mr-2 text-blue-500" />
                Usar Cámara
              </button>
            </div>
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={preview}
              alt="Imagen de residuo subido"
              className="w-full max-h-[500px] object-contain bg-white"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={handleRemoveImage}
                  className="p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <Trash className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={toggleWebcam}
                  className="p-2 bg-blue-500/80 rounded-full hover:bg-blue-600 transition-colors duration-200"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
              <button
                onClick={() => handleClassify(image!)}
                disabled={isLoading}
                className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? 'Clasificando...' : 'Clasificar'}
              </button>
            </div>
            {isLoading && (
              <div className="absolute bottom-16 left-0 right-0 px-4">
                <div className="w-full bg-black/30 rounded-full h-4 relative">
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-200 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                  <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm text-white font-semibold">
                    {progress}%
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection;