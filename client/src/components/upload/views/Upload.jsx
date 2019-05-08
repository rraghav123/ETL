import React, { useState, useMemo } from "react";

import "../styles/upload.scss";

import { fileUpload } from "../services/UploadService";

import DropZone from "../../dropzone/views/Dropzone";
import ProgressBar from "../../progress-bar/views/ProgressBar";

import { UPLOAD_STATICS, ERROR_MESSAGES } from "../../../statics/Enums";

const Upload = () => {
    const [file, handleFile] = useState("");
    const [uploading, handleUploadingState] = useState(false);
    const [uploaded, handleUploadState] = useState(false);
    const onFilesAdded = (file) => {
      handleUploadState(false);
        handleFile(file);
    };

    const handleSubmit = (e) => {
        const formData = new FormData();
        formData.append(file.name, file);
        handleUploadingState(true);
        fileUpload(formData);
    };

    const checkFileType = () => {
      // check file type and size (csv and 10MB)
      return !(file.type === "text/csv" && file.size < UPLOAD_STATICS.FILE_SIZE);

    };

    const isButtonDisabled = () => {
        let isDisabled = true;
        if (uploading) {
            isDisabled = true;
        } else if (file) {
          isDisabled = checkFileType()
        }
        return isDisabled;
    };

    const getButtonClass = () => {
        return isButtonDisabled() ?
            'upload__actions__customButton upload__actions__customButton--disabled' :
            'upload__actions__customButton';
    };

    const renderFile = () => (
        <div className="upload__files__row">
            <div className="upload__files__fileName">{file.name}</div>
          {
                uploading &&
                <ProgressBar
                    fileSize={(file.size / 1024).toFixed(2)}
                    handleUploadingState={handleUploadingState}
                    handleUploadState={handleUploadState}
                />
            }
            {
                uploaded &&
              <span className="upload__files__finished">{UPLOAD_STATICS.FINISHED}</span>
            }
        </div>
    );

    const getErrorMessage = useMemo(() => {
      if(file) {
        if(file.type !=="text/csv") {
          return ERROR_MESSAGES.ERROR_FILE_TYPE;
        } else if( file.size > UPLOAD_STATICS.FILE_SIZE) {
          return ERROR_MESSAGES.ERROR_FILE_SIZE;
        }
      }
      return "";
    }, [file]);

    return (
        <div className="upload">
            <div className="upload__greetings">
                <h1>{UPLOAD_STATICS.WELCOME}</h1>
                <span className="upload__greetings__title">{UPLOAD_STATICS.TITLE}</span>
            </div>
            <div className="upload__content">
                <DropZone
                    onFilesAdded={onFilesAdded}
                />
            </div>
            <div className="upload__files">
                {
                    file && renderFile()
                }
            </div>
            <div className="upload__actions">
                <button
                    className={getButtonClass()}
                    disabled={isButtonDisabled()}
                    onClick={handleSubmit}>
                    {UPLOAD_STATICS.UPLOAD}
                </button>
                <span className="upload__actions__btnLabel">{UPLOAD_STATICS.UPLOAD_LIMIT}</span>
                <span className="upload__actions__error-message">{getErrorMessage}</span>
            </div>
        </div>
    );
};

export default Upload;
