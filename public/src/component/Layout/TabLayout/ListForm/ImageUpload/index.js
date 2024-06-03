import { useEffect, useState } from "react";
import { FaTrash, FaExpand } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const ImageUpload = ({ imageUrl, onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [msg, setMsg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageUrl && imageUrl !== "") {
      setPreviewUrl(imageUrl);
    } else {
      setPreviewUrl("");
    }

  }, [imageUrl]);

  function handleUpload() {
    const cancelBtn = document.getElementById("closeBtn");

    if (files.length === 0) {
      toast.error("Chưa chọn file!");
      return;
    }

    onImageUpload(files);
  }

  function handleFileChange(event) {
    const selectedFiles = Array.from(event.target.files);
    const imageFiles = selectedFiles.filter((file) => {
      console.log("file: ", file.name);
      const extension = file.name.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png", "gif", "bmp"].includes(extension);
    });

    const newPreviewUrl = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrl(newPreviewUrl);
    setFiles((prevFiles) => [...prevFiles, ...imageFiles]);
  }

  function handleFileRemove() {
    setPreviewUrl("");
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
          name="image"
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
      <div className="overflow-x-auto" style={{ display: "flex" }}>
        <div className="mx-3">
          <div className="row al">
            <button
              className="btn col col-md-auto"
              onClick={() => handleViewImage(previewUrl)}
            >
              <FaExpand />
            </button>
            <button
              className="btn col col-md-auto"
              onClick={() => handleFileRemove()}
            >
              <FaTrash style={{ color: "red" }} />
            </button>
          </div>
          <img
            src={previewUrl}
            alt={previewUrl}
            style={{ maxWidth: "200px", maxHeight: "200px" }}
          />
        </div>
      </div>
    </div>
  );
};
