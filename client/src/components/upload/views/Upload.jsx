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

    /**
     *
     * @param {*} file File selected by user
     * this function will fire when user adds a file
     */
    const onFilesAdded = (file) => {
        handleUploadState(false);
        handleFile(file);
    };

    /**
     *
     * Handle FormSubmit
     */
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append(file.name, file);
        handleUploadingState(true);
        fileUpload(formData);
    };

    /**
     * Check Selected file size
     */
    const checkFileSize = () => {
        // check file type and size (csv and 10MB)
        return (file.size > UPLOAD_STATICS.FILE_SIZE);
    };


    /**
     * Check isButtonDisable logic
     */
    const isButtonDisabled = () => {
        let isDisabled = true;
        if (uploading) {
            isDisabled = true;
        } else if (file) {
            isDisabled = checkFileSize();
        }
        return isDisabled;
    };

    /**
     * Get Button custom classNames
     */
    const getButtonClass = () => {
        return isButtonDisabled() ?
            'upload__actions__customButton upload__actions__customButton--disabled' :
            'upload__actions__customButton';
    };

    /**
     * Render Filename, ProgressBar, UploadFinish message
     */
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

    /**
     * Render Error Messages
     */
    const getErrorMessage = useMemo(() => {
        if (file) {
            if (file.size > UPLOAD_STATICS.FILE_SIZE) {
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
