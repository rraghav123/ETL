import React, { useRef } from "react";
import PropTypes from 'prop-types';

import "../styles/drop-zone.scss";
import { DROP_ZONE_STATICS } from "../../../statics/Enums";

const DropZone = (props) => {
    const fileInputRef = useRef(null);

    const openFileDialog = () => {
        fileInputRef.current.click();
    };
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
