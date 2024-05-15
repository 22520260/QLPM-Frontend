import { useState } from "react";
import { FaTrash, FaExpand } from "react-icons/fa";

export const ImageUpload = ({ onImageUpload }) => {
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
        .then((res) => res.blob())
        .then((blob) => {
          fd.append(`file${index + 1}`, blob);
        })
        .catch((err) => console.error(err));
    });
  }

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const imageFiles = selectedFiles.filter((file) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
    });

    const newPreviewUrls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result); // Pass base64 string to parent component
      };
      reader.readAsDataURL(file);
    });
  };

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
        <label htmlFor="inputfile" className="btn btn-outline-primary">
          Chọn file
        </label>
        <input
          id="inputfile"
          style={{ display: "none" }}
          className="form-control"
          onChange={handleFileChange}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.bmp"
        />
        <button className="btn btn-outline-primary" onClick={handleUpload}>
          Upload
        </button>
      </div>
      {previewUrls.length > 0 && (
        <div className="overflow-x-auto" style={{ display: "flex" }}>
          {previewUrls.map((url, index) => (
            <div key={index} className="mx-3">
              <div className="row al">
                <button
                  className="btn col col-md-auto"
                  onClick={() => handleViewImage(url)}
                >
                  <FaExpand />
                </button>
                <button
                  className="btn col col-md-auto"
                  onClick={() => handleFileRemove(index)}
                >
                  <FaTrash style={{ color: "red" }} />
                </button>
              </div>
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
