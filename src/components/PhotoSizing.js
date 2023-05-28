import React, { useState } from "react";
import UploadIcon from "../assets/upload.png"

const PhotoSizing = () => {
  const [resizedImage, setResizedImage] = useState("");
  const [sizeW, setSizeW] = useState()
  const [sizeH, setSizeH] = useState()
  const [originalSizeW, setOriginalSizeW] = useState()
  const [originalSizeH, setOriginalSizeH] = useState()
  const [uploadedFile, setUploadedFile] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [aspectRatio, setAspectRatio] = useState(false)

  const handleFileChange = () => {
    var file = uploadedFile;
    var reader = new FileReader();
    reader.onload = (e) => {
      var img = document.createElement("img");
      img.onload = () => {
        console.log("Hello")
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);


        canvas.width = sizeW;
        canvas.height = sizeH;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, sizeW, sizeH);
        var dataurl = canvas.toDataURL("image/png");
        setResizedImage(dataurl)
        // this.setState({previewSrc: dataurl});
      }
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(reader.result);
        var img = document.createElement("img");
        img.onload = () => {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          console.log("hello")

          setOriginalSizeW(img.width);
          setOriginalSizeH(img.height);
          setSizeH(img.height)
          setSizeW(img.width)

        }
        img.src = e.target.result;

      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = () => {
    if (resizedImage) {
      const link = document.createElement("a");
      link.href = resizedImage;
      link.download = "resized_image.jpg";
      link.click();
    }
  };
  const handleImageSize = (val, sizeD) => {
    if (aspectRatio) {
      if (sizeD == "sizew") {
        setSizeW(val)
        setSizeH(Math.ceil((val * originalSizeH) / originalSizeW))
      }
      else {
        setSizeH(val)
        setSizeW(Math.ceil((val * originalSizeW) / originalSizeH))

      }
    }
    else {
      if (sizeD == "sizew") {
        setSizeW(val)
      }
      else {
        setSizeH(val)
      }
    }

  }

  return (
    <div className='h-screen w-screen text-Roboto overflow-x-hidden  pb-40 mt-5 bg-white from-neutral-700 via-neutral-700 to-neutral-700'>
      <section className="flex xl:flex-row lg:flex-row sm:flex-col justify-around xl:items-start sm:items-center w-100 mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
        <div className="flex flex-col w-5/12">
          <h1 className='text-white mb-2 text-xl invert-0.2'>Upload your image</h1>
          {uploadedFile == null ?
            <label
              htmlFor="folder"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <img src={UploadIcon} className='mb-4' />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Upload Image
                </p>
              </div>
              <input
                id="folder"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { handleImageChange(e); setUploadedFile(e.target.files[0]) }}
              />
            </label> :
            <div className="flex  w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <img src={selectedImage} className="w-44 h-44 py-4 pl-4 " /> <span onClick={() => { setUploadedFile(null); setSelectedImage(null) }}>X</span>
            </div>
          }
          <div className="mt-10">
            <input value={sizeW} onChange={(e) => handleImageSize(e.target.value, 'sizew')} class="text-lg text-black text-Roboto shadow appearance-none border rounded py-2 px-3 mr-2 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Size(length)" />
            <input value={sizeH} onChange={(e) => handleImageSize(e.target.value, 'sizeh')} class="text-lg text-black text-Roboto shadow appearance-none border rounded py-2 px-3 mr-2 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="Size(breadth)" />

            <div className="mt-4 flex items-center">
              <div onClick={() => { setSizeW(originalSizeW); setSizeH(originalSizeH); setAspectRatio(!aspectRatio) }} class={`border-slate-400 border mr-2 inline-flex items-center justify-center bg-${aspectRatio ? 'blue-500' : 'white'}`} style={{ 'height': '16px', 'width': '16px', 'border-radius': '4px' }}>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="tick-icon"><path d="M8.41803 0.168978L3.71311 4.52706L1.63115 2.59857C1.36885 2.35561 0.959016 2.35561 0.696721 2.59857C0.434426 2.84153 0.434426 3.22115 0.696721 3.46411L3.2377 5.81778C3.36885 5.93926 3.53279 6 3.69672 6C3.86066 6 4.04098 5.93926 4.15574 5.81778L9.30328 1.04971C9.56557 0.806747 9.56557 0.427123 9.30328 0.184163C9.09016 -0.0587957 8.66393 -0.0587958 8.41803 0.168978Z" fill="white"></path></svg>
              </div>
              <span>Lock aspect ratio</span>
            </div>
          </div>
          <div className="mt-10">
            <button onClick={handleFileChange} className=" px-4 py-2 text-white text-xl bg-blue-500 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ">
              Resize

            </button>
          </div>

        </div>
        <div>
          {resizedImage && (
            <div>
              <h2 className='text-white mb-2 text-xl invert-0.2'  >Resized Image:</h2>
              <img src={resizedImage} alt="Resized" className="max-w-sm max-h-sm"/>
              <p className="invert-0.3 text-[10px]">Display size might differ, please download it to get correct dimensions</p>
              <div className="mt-10">
                <button onClick={handleSaveImage} className=" px-4 py-2 text-white text-xl bg-blue-500 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ">
                  Save Image
                </button>
              </div>
            </div>
          )}
        </div>
      </section >
      <section className="flex justify-around w-full mx-4 p-6 mx-auto  rounded-md dark:bg-gray-800 mt-10">
        <div className="flex flex-cols justify-around w-100 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-4 ">


          <div>
            <button onClick={()=>{setSizeW(132);setSizeH(177)}} className=" px-4 py-2 text-white text-lg bg-gray-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  ">
              Indian Passport

            </button>
          </div>
          <div>
            <button onClick={()=>{setSizeW(500);setSizeH(500)}} className=" px-4 py-2 text-white text-lg bg-gray-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  ">
              Whatsapp Dp

            </button>
          </div>
          <div>
            <button onClick={()=>{setSizeW(193);setSizeH(193)}} className=" px-4 py-2 text-white text-lg bg-gray-800 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  ">
              American Passport

            </button>
          </div>
        </div>
      </section>
    </div >


  );
};

export default PhotoSizing;
