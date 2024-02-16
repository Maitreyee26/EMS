import React from 'react';

const Demo1= () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Preview the selected image
      const image = document.getElementById('profilePreview');
      image.src = URL.createObjectURL(selectedFile);
      // Store the selected file for further processing
      setSelectedImage(selectedFile);
    }
  };

  return (
    <div className="custom-file-upload">
      <label htmlFor="profilePhoto">
        <i className="fa fa-camera"></i>
        <span>Upload Profile Photo</span>
      </label>
      <input
        type="file"
        id="profilePhoto"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Demo1;