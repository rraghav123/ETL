const fileUpload = (data) =>
    fetch('/api/upload', {
        method: 'POST',
        body: data
    });

export { fileUpload };
