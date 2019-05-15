import React, { useRef } from "react";
import PropTypes from 'prop-types';

import "../styles/drop-zone.scss";
import { DROP_ZONE_STATICS } from "../../../statics/Enums";
/**
 *
 * @returns DROPBox UI (opens up a model through which user can select file)
 */
const DropZone = (props) => {
    const fileInputRef = useRef(null);

    /**
     * Open model to select file
     */
    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    /**
     *
     * @param {*} e file details is present in event(e)
     * onClick event we'll invoke onFileAdded method with selectedFIle
     */
    const onFilesAdded = (e) => {
        const { files } = e.target;
        props.onFilesAdded(files[0]);
    };

    return (
        <div className="dropZone" onClick={openFileDialog}>
            <img
                alt="upload"
                className="dropZone__icon"
            />
            <input
                ref={fileInputRef}
                className="dropZone__fileInput"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <div>
                <span>{DROP_ZONE_STATICS.BUTTON}</span>
            </div>
        </div>
    );
};

DropZone.propTypes = {
    onFilesAdded: PropTypes.func.isRequired
};

export default DropZone;
