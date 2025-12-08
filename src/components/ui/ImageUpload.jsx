import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

const ImageUpload = ({ onImageSelect, currentImage, label = "Upload Image" }) => {
    const [preview, setPreview] = useState(currentImage);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        processFile(file);
    };

    const processFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            onImageSelect(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setPreview(null);
        onImageSelect(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="w-full">
            <label className="block text-sm text-gray-400 mb-2">{label}</label>

            <div
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
                    ${isDragging
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-gray-600 bg-gray-700/30 hover:border-blue-400 hover:bg-gray-700/50'
                    }
                `}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*"
                />

                {preview ? (
                    <div className="relative w-full h-full">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <p className="text-white font-medium flex items-center">
                                <Upload size={18} className="mr-2" /> Change Image
                            </p>
                        </div>
                        <button
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors z-10"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                        <div className={`
                            p-3 rounded-full mb-3 transition-colors
                            ${isDragging ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700 text-gray-500 group-hover:text-blue-400 group-hover:bg-blue-500/10'}
                        `}>
                            <Upload size={32} />
                        </div>
                        <p className="text-sm font-medium text-gray-300">
                            Click or drag image here
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
