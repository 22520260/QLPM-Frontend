import { useState } from "react";
import { FaTrash, FaExpand } from "react-icons/fa";

export const ImageUpload = () => {
    const [previewUrls, setPreviewUrls] = useState([]);
    const [msg, setMsg] = useState(null);

    function handleUpload() {
        const cancelBtn = document.getElementById("closeBtn");

        if (previewUrls.length === 0) {
            setMsg("No file selected");
            if (cancelBtn) {
                cancelBtn.click();
            }
            return;
        }

        const fd = new FormData();
        previewUrls.forEach((url, index) => {
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    fd.append(`file${index + 1}`, blob);
                    if (index === previewUrls.length - 1) {
                        // All files are appended, proceed to upload
                        setMsg("Uploading ... ");
                        fetch('http://httpbin.org/post', {
                            method: "POST",
                            body: fd,
                            headers: {
                                "Custom-Header": "value",
                            }
                        })
                            .then(res => {
                                if (!res.ok) {
                                    throw new Error("Bad response");
                                }
                                setMsg('Upload Successful');
                                return res.json();
                            })
                            .then(data => console.log(data))
                            .catch(err => {
                                setMsg('Upload failed');
                                console.error(err);
                            });
                    }
                })
                .catch(err => console.error(err));
        });
    }

    function handleFileChange(event) {
        const selectedFiles = Array.from(event.target.files);
        const imageFiles = selectedFiles.filter(file => {
            const extension = file.name.split('.').pop().toLowerCase();
            return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension);
        });

        // Keep the existing previewUrls and add new ones
        setPreviewUrls(prevUrls => [...prevUrls, ...imageFiles.map(file => URL.createObjectURL(file))]);
    }

    function handleFileRemove(index) {
        const newPreviewUrls = [...previewUrls];
        newPreviewUrls.splice(index, 1);
        setPreviewUrls(newPreviewUrls);
    }

    function handleViewImage(url) {
        window.open(url);
    }

    return (
        <div>
            <div className="input-group mb-3">
                <label htmlFor="inputfile" className="btn btn-outline-primary">Chọn file</label>
                <input id="inputfile" style={{ display: 'none' }} className="form-control" onChange={handleFileChange} type="file" multiple accept=".jpg,.jpeg,.png,.gif,.bmp" />
                <button className="btn btn-outline-primary" onClick={handleUpload}>Upload</button>
            </div>
            {previewUrls.length > 0 && (
                <div className="overflow-x-auto" style={{ display: 'flex' }}>
                    {previewUrls.map((url, index) => (
                        <div key={index} className="mx-3">
                            <div className="row al">
                                <button className="btn col col-md-auto" onClick={() => handleViewImage(url)}><FaExpand /></button>
                                <button className="btn col col-md-auto" onClick={() => handleFileRemove(index)}><FaTrash style={{ color: 'red' }} /></button>
                            </div>
                            <img src={url} alt={`Preview ${index + 1}`} style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
