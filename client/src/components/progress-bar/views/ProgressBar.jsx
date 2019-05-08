import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Pusher from 'pusher-js';

import KEY from "../../../../config/keys";
import "../styles/progress-bar.scss";

const ProgressBar = (props) => {
    const [progress, handleProgress] = useState(0);
    useEffect(() => {
        const pusher = new Pusher(KEY.PUSHER_APP_KEY, {
            cluster: KEY.PUSHER_APP_CLUSTER
        });
        const channel = pusher.subscribe('upload');
        channel.bind('progress', data => {
            handleProgress(data.percent);
            if (data.percent === 100) {
                props.handleUploadState(true);
                props.handleUploadingState(false);
            }
        });
    });

    const renderFileProgress = () => {
        const { fileSize } = props;
        const bytesUploaded = ((fileSize * progress) / 100).toFixed(2);
        return (
            <span>
                {`${bytesUploaded}KB of ${fileSize}KB `}
                <span className="progressBar__fileSizeProgress__percentage">{`%${progress} uploaded`}</span>
            </span>);
    };

    return (
        <div>
            <div className="progressBar">
                <div
                    className="progressBar__progress"
                    style={{ width: progress + '%' }}
                />
            </div>
            <span className="progressBar__fileSizeProgress">{renderFileProgress()}</span>
        </div>
    );
};

ProgressBar.propTypes = {
    fileSize: PropTypes.string
};

ProgressBar.defaultProps = {
    fileSize: ""
};

export default ProgressBar;
