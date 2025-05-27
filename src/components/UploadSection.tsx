import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Camera, Trash, X } from 'lucide-react';
import Webcam from 'react-webcam';
import { traducirEtiqueta } from '../utils/helpers';
import { 
  fadeIn, 
  fadeInUp, 
  scaleUp, 
  hoverScale, 
  hoverScaleLarge, 
  springTransition, 
  smoothTransition, 
  longTransition, 
  delays,
  animatePresenceConfig 
} from '../utils/animations';

import { API_ROUTES } from '../services/api.config';

interface UploadSectionProps {
  onClassificationComplete: (prediction: string, confidence: number, imageUrl: string) => void;
  onImageRemove: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onClassificationComplete, onImageRemove }) => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const detectionInterval = useRef<ReturnType<typeof setInterval> | null>(null);

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
    onImageRemove();
  };

  const handleClassify = async (imageData: string | File) => {
    if (isClassifying) return;

    setIsClassifying(true);
    setProgress(0);

    const formData = new FormData();
    if (imageData instanceof File) {
      formData.append('imagen', imageData);
    } else {
      const response = await fetch(imageData);
      const blob = await response.blob();
      formData.append('imagen', blob, 'webcam-capture.jpg');
    }

    try {
      const res = await fetch(API_ROUTES.PREDICT, {
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
      setIsClassifying(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      handleClassify(imageSrc);
    }
  }, [webcamRef]);

  const toggleWebcam = () => {
    const newState = !isWebcamActive;
    setIsWebcamActive(newState);

    if (!newState) {
      onImageRemove();
    }

    if (image) {
      handleRemoveImage();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  React.useEffect(() => {
    if (isWebcamActive) {
      detectionInterval.current = setInterval(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc && !isClassifying) {
          handleClassify(imageSrc);
        }
      }, 3000);

      return () => {
        if (detectionInterval.current) {
          clearInterval(detectionInterval.current);
        }
      };
    }
  }, [isWebcamActive, isClassifying]);

  return (
    <motion.section
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={longTransition}
      id="upload"
      className="py-8 md:py-12"
    >
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: delays.short }}
        className="text-center mb-8"
      >
        <motion.h2
          variants={scaleUp}
          initial="initial"
          animate="animate"
          transition={{ delay: delays.medium }}
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent"
        >
          Clasifica tu Residuo
        </motion.h2>
        <motion.p
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: delays.long }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Sube una imagen o usa la cámara para clasificar el residuo y nuestro sistema de inteligencia artificial te dirá a qué categoría pertenece.
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: delays.long }}
        className="mt-8 max-w-2xl mx-auto"
      >
        <AnimatePresence {...animatePresenceConfig}>
          {isWebcamActive ? (
            <motion.div
              key="webcam"
              variants={scaleUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={smoothTransition}
              className="relative rounded-xl overflow-hidden shadow-lg bg-black"
            >
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="w-full"
              />
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: delays.short }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-center"
              >
                <motion.button
                  variants={hoverScaleLarge}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleWebcam}
                  className="p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={captureImage}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Clasificando...' : 'Capturar y Clasificar'}
                </motion.button>
              </motion.div>
              {isLoading && (
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  className="absolute bottom-16 left-0 right-0 px-4"
                >
                  <div className="w-full bg-black/30 rounded-full h-4 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={smoothTransition}
                      className="bg-green-500 h-4 rounded-full"
                    />
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-sm text-white font-semibold">
                      {progress}%
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : !preview ? (
            <motion.div
              key="upload"
              variants={scaleUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={smoothTransition}
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
              <motion.div
                variants={hoverScale}
                whileHover="hover"
                transition={springTransition}
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-green-500" />
              </motion.div>
              <motion.h3
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: delays.short }}
                className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200"
              >
                Arrastra o haz clic para subir
              </motion.h3>
              <motion.p
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ delay: delays.medium }}
                className="text-gray-500 dark:text-gray-400 mb-6"
              >
                Formatos soportados: JPG, PNG, WEBP
              </motion.p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center"
                >
                  <Image className="w-5 h-5 mr-2 text-green-500" />
                  Seleccionar Imagen
                </motion.button>
                <motion.button
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWebcam();
                  }}
                  className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center"
                >
                  <Camera className="w-5 h-5 mr-2 text-blue-500" />
                  Usar Cámara
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              variants={scaleUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={smoothTransition}
              className="relative rounded-xl overflow-hidden shadow-lg"
            >
              <motion.img
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={smoothTransition}
                src={preview}
                alt="Imagen de residuo subido"
                className="w-full max-h-[500px] object-contain bg-white"
              />

              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: delays.short }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-center"
              >
                <div className="flex space-x-2">
                  <motion.button
                    variants={hoverScaleLarge}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleRemoveImage}
                    className="p-2 bg-red-500/80 rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <Trash className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    variants={hoverScaleLarge}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={toggleWebcam}
                    className="p-2 bg-blue-500/80 rounded-full hover:bg-blue-600 transition-colors duration-200"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
                <motion.button
                  variants={hoverScale}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleClassify(image!)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500/90 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? 'Clasificando...' : 'Clasificar Imagen'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default UploadSection;