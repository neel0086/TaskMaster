import React, { useState } from "react";

const PhotoSizing = () => {
  const [resizedImage, setResizedImage] = useState("");

  const handleFileChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      var img = document.createElement("img");
      img.onload = () => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 300;
        var MAX_HEIGHT = 300;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        var dataurl = canvas.toDataURL("image/png");
        setResizedImage(dataurl)
        // this.setState({previewSrc: dataurl});
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
  };

  const handleSaveImage = () => {
    if (resizedImage) {
      const link = document.createElement("a");
      link.href = resizedImage;
      link.download = "resized_image.jpg";
      link.click();
    }
  };
  return (
    <div className='h-screen w-screen text-Roboto overflow-x-hidden  pb-40 mt-5 bg-gradient-to-tr from-neutral-700 via-neutral-700 to-neutral-700'>
      <section className="flex  justify-around w-full mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {resizedImage && (
          <div>
            <h2>Resized Image:</h2>
            <img src={resizedImage} alt="Resized" />
            <button onClick={handleSaveImage}>Save Image</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default PhotoSizing;
