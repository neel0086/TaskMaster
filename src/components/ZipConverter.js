import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import UploadIcon from "../assets/upload.png"
import "./ZipConverter.css"
import JSZip from "jszip";
import { saveAs } from "save-as";


const fs = window.require('fs');
const path = window.require('path');

const ZipConverter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [filesToZip, setFilesToZip] = useState()
  const [fileFolder, setFileFolder] = useState({});
  const [progressWidth, setProgressWidth] = useState(0)

  const handleFileChange = (event) => {
    setProgressWidth(0)
    setIsLoading(true)
    const files = event.target.files;
    setFilesToZip(files)
    const names = Array.from(files).map((file) => file);
    setFileNames(names);
    setIsLoading(false)
  };
  const handleZip = async () => {
    var zip = new JSZip();
    var noOfFile=filesToZip.length;
    var i=0
    for (var file in filesToZip) {
      console.log(filesToZip[file])
      const data = await readFileContent(filesToZip[file]);
      if (fileFolder) {
        zip.file(filesToZip[file].webkitRelativePath, data);
      }
      else {
        zip.file(filesToZip[file].name, data);
      }
      setProgressWidth(Math.floor((i*100)/noOfFile)+"%")
      i++
    }

    zip.generateAsync({ type: "blob" })
      .then((content) => {
        saveAs(content, "output.zip")
      })
  }

  // ZIP FOR FOLDER //
  async function readFileContent(file) {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;

      const blob = new Blob([file], { type: file.type });
      reader.readAsArrayBuffer(blob);
    });

  }

  const unzipFile = async (zipFile) => {
    const zip = new JSZip();
  
    try {
      const loadedZip = await zip.loadAsync(zipFile);
  
      loadedZip.forEach(async (relativePath, file) => {
        if (file.dir) {
          // Create directory
          zip.folder(relativePath);
        } else {
          // Extract file
          const content = await file.async("uint8array");
          console.log(relativePath, content);
          // Do something with the extracted file content
        }
      });
    } catch (error) {
      console.error("Error unzipping file:", error);
    }
  };
  


  return (
    <div className='h-screen w-screen text-Roboto overflow-x-hidden  pb-40 mt-5 bg-white from-neutral-700 via-neutral-700 to-neutral-700'>
      <section className="flex justify-around w-full mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">

        <div className="flex flex-col w-5/12">
          <h1 className='text-black mb-2 text-xl invert-0.2'>FILE UPLOAD</h1>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <img src={UploadIcon} className='mb-4' />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Upload File (any extension is supported)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => { setFileFolder(false); handleFileChange(e) }}
              multiple
            />
          </label>
          <span className='text-black invert-0.4'>{fileFolder == false ? "File Uploaded Succesfully" : " "}</span>
        </div>

        {/* FOLDER  */}
        <div className="flex flex-col w-5/12">
          <h1 className='text-black mb-2 text-xl invert-0.2'>FOLDER UPLOAD</h1>
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
                Upload Folder
              </p>
            </div>
            <input
              type="file"
              directory=""
              webkitdirectory="" multiple
              id="folder"
              style={{ display: "none" }}
              onChange={(e) => { setFileFolder(true); handleFileChange(e) }}
            />
          </label>

          <span className='text-black invert-0.4'>{fileFolder == true ? "Folder Uploaded Succesfully" : " "}</span>
        </div>
      </section>
      <section className=" w-100 mx-2 mt-12 px-6 mx-auto flex items-center">

        <div class="w-full h-fit bg-gray-200 rounded-full dark:bg-gray-700 mr-8">
          <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${progressWidth}`}}> {progressWidth}</div>
        </div>

        <button onClick={(e) => { handleZip() }} className="float-right px-4 py-2 text-white text-xl bg-blue-500 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ">
          Convert

        </button>
      </section>
      <section className=" w-100 mx-2 mt-4 px-6 pb-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 ">
        <h2 className="text-black font-Roboto text-lg mb-2">Uploaded Files:</h2>

        <div className="relative table_body w-full  shadow-md sm:rounded-lg">
          <table className="w-screen text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-lg text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sr no.
                </th>
                <th scope="col" class="px-6 py-3">
                  File Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Path
                </th>

              </tr>
            </thead>
            <tbody className="bg-inherit table_body" >
              {fileNames.map((obj, index) => (
                <tr key={index} class="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="text-black text-lg py-2 px-4  border-gray-300">{index + 1}</td>
                  <td className="text-black text-lg py-2 px-4  border-gray-300">{obj.name}</td>
                  <td className="text-black text-lg py-2 px-4  border-gray-300">{obj.webkitRelativePath}</td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ZipConverter;
