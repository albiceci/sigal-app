import React, { useState, ChangeEvent, DragEvent } from "react";
import { useTranslation } from "react-i18next";

interface FileError {
  name: string;
  error: string;
}

const FileInput = ({
  name,
  value,
  label = "Drop your files here to upload, or click here to browse",
  onChange,
  metadata,
  errors,
}: {
  name: string;
  value: File[];
  label?: string;
  onChange: (name: string, value: File[]) => void;
  metadata?: {
    MAX_FILES?: number;
    MAX_FILE_SIZE_MB?: number;
    ALLOWED_TYPES?: string[];
  };
  errors: string[];
}) => {
  const { t } = useTranslation();

  const [uploadErrors, setUploadErrors] = useState<FileError[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Config
  const MAX_FILES = metadata && metadata.MAX_FILES ? metadata.MAX_FILES : 5;
  const MAX_FILE_SIZE_MB = metadata && metadata.MAX_FILE_SIZE_MB ? metadata.MAX_FILE_SIZE_MB : 5;
  const ALLOWED_TYPES =
    metadata && metadata.ALLOWED_TYPES ? metadata.ALLOWED_TYPES : ["image/jpeg", "image/png", "application/pdf"];

  const validateFiles = (selectedFiles: File[]): { valid: File[]; errors: FileError[] } => {
    const newErrors: FileError[] = [];
    const validFiles: File[] = [];

    selectedFiles.forEach((file) => {
      if (value.length + validFiles.length >= MAX_FILES) {
        newErrors.push({ name: file.name, error: `Max ${MAX_FILES} files allowed.` });
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        newErrors.push({ name: file.name, error: "Invalid type. Only JPG, PNG, PDF allowed." });
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        newErrors.push({ name: file.name, error: `Too large. Max ${MAX_FILE_SIZE_MB}MB.` });
        return;
      }

      validFiles.push(file);
    });

    return { valid: validFiles, errors: newErrors };
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    const { valid, errors } = validateFiles(selected);
    onChange(name, [...value, ...valid]);
    setUploadErrors(errors);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const { valid, errors } = validateFiles(droppedFiles);
    onChange(name, [...value, ...valid]);
    setUploadErrors(errors);
  };

  const handleRemoveFile = (index: number) => {
    onChange(
      name,
      value.filter((_, i) => i !== index),
    );
  };

  return (
    <div className="max-w-md mx-auto mt-4 text-center font-sans">
      <div className="flex flex-col px-1 mb-2">
        {errors.length
          ? errors.map((error) => {
              return <span className="text-red-400 font-semibold text-sm">&#x25cf; {t(error)}</span>;
            })
          : ""}
      </div>
      <div
        className={`border-2 border-dashed rounded-lg p-10 py-6 cursor-pointer transition-colors duration-200 ${
          isDragging ? "border-primary bg-blue-50" : "border-gray-400 bg-gray-50 hover:border-primary"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          name={name}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />
        <p className="text-gray-600">{isDragging ? "Drop your files here..." : t(label)}</p>
      </div>

      {value.length > 0 && (
        <ul className="mt-4 space-y-2 text-left">
          {value.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded text-sm">
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
                title={file.name}
              >
                {file.name.length > 30 && file.name.match(/.{30}/g) !== null
                  ? `${file.name.match(/.{30}/g)![0]}...`
                  : file.name}
                <span className="text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </a>
              <button
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700 font-semibold text-lg"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Error messages */}
      {uploadErrors.length > 0 && (
        <div className="text-left mt-3 text-red-600 text-sm">
          {uploadErrors.map((err, i) => (
            <p key={i}>
              ❌ {err.name}: {err.error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
