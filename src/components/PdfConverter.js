import React, { useState } from 'react';
import jsPDF from 'jspdf';
import UploadIcon from "../assets/upload.png"

const PdfConverter = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageVisible, setImageVisible] = useState(0)
    const [imageCenter, setImageCenter] = useState(true)
    const [fitPage, setFitPage] = useState(false)


    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const readerPromises = files.map((file) => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(readerPromises).then((results) => {
                setSelectedImages(results);
                setImageVisible(0)
            });
        }
        
    };

    const convertToPdf = () => {
        if (selectedImages.length > 0) {
            const doc = new jsPDF('p', 'pt', 'a4');

            selectedImages.forEach((selectedImage, index) => {
                const img = new Image();

                img.onload = () => {
                    const width = doc.internal.pageSize.width;
                    const height = doc.internal.pageSize.height;
                    const aspectRatio = img.width / img.height;

                    let targetWidth, targetHeight;

                    if (img.width > width || img.height > height) {
                        // Reduce the image size if it exceeds the page size
                        if (aspectRatio > 1) {
                            targetWidth = width - 80;
                            targetHeight = targetWidth / aspectRatio;
                        } else {
                            targetHeight = height - 80;
                            targetWidth = targetHeight * aspectRatio;
                        }
                    } else {
                        // Use the original image size if it fits within the page size
                        targetWidth = img.width;
                        targetHeight = img.height;
                    }

                    if (index > 0) {
                        // Add a new page if the image exceeds the available height
                        doc.addPage();
                    }

                    // Calculate the x and y coordinates to center the image on the page
                    const x = (width - targetWidth) / 2 + 2.5;
                    const y = (height - targetHeight) / 2;

                    doc.addImage(img, 'JPEG', x, y, targetWidth, targetHeight);

                    if (index === selectedImages.length - 1) {
                        doc.save('converted_images.pdf');
                    }
                };

                img.src = selectedImage;
            });
        }

    };
    const handleDimensions = (selectedImage) => {
        const img = new Image();
        img.src = selectedImage;
        const doc = new jsPDF('p', 'pt', 'a4');
        const width = doc.internal.pageSize.width;
        const height = doc.internal.pageSize.height;
        const aspectRatio = img.width / img.height;
        let targetWidth, targetHeight;
        if (img.width > width || img.height > height) {
            if (aspectRatio > 1) {
                if (fitPage) {
                    targetWidth = width;
                }
                else {
                    targetWidth = width - 20;
                }
                targetHeight = targetWidth / aspectRatio;
            } else {
                if (fitPage) {
                    targetHeight = height;
                }
                else {
                    targetHeight = height - 20;
                }
                targetHeight = height - 20;
                targetWidth = targetHeight * aspectRatio;
            }
        } else {
            targetWidth = img.width;
            targetHeight = img.height;
        }
        const x = (width - targetWidth) / 2;
        const y = (height - targetHeight) / 2;
        return [targetWidth, targetHeight, 0, 0]
    }
    
    return (
        <div className='h-screen w-screen text-Roboto overflow-x-hidden  pb-40 mt-5 bg-white from-neutral-700 via-neutral-700 to-neutral-700'>
            <section className="flex justify-center items-center  mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
                <div className="flex flex-col w-5/12">
                    <h1 className='text-white mb-2 text-xl invert-0.2'>Upload your image</h1>

                    <label
                        htmlFor="file"
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
                            type="file"
                            id="file"
                            accept="image/*"
                            className='hidden'
                            onChange={handleImageChange}
                            multiple />

                    </label>


                </div>
            </section>
            {selectedImages.length > 0 && (
                <section className="flex justify-around   mx-4 p-6 mx-auto  rounded-md shadow-md dark:bg-gray-800 mt-20">
                    <div id="default-carousel" className="relative w-full h-[842px] w-[596px] " >
                        {/* Carousel wrapper */}
                        <div className="relative h-full w-full bg-white shadow-md shadow-slate-600 backdrop-blur-lg  overflow-hidden rounded-lg">
                            {selectedImages.map((selectedImage, index) => {
                                const [targetWidth, targetHeight, x, y] = handleDimensions(selectedImage)
                                return (
                                    <div className={`${imageVisible === index ? '' : 'hidden'} w-full h-full  flex items-center justify-center duration-700 ease-in-out`} key={index}>
                                        <img
                                            src={selectedImage}
                                            alt={`Selected ${index + 1}`}
                                            className=" block p-[40px]"
                                            style={{
                                                top: `${y}px`,
                                                left: `${x}px`,
                                                width: `${targetWidth}px`,
                                                height: `${targetHeight}px`,
                                            }}
                                        />
                                    </div>
                                );
                            })}

                        </div>
                        {/* Slider indicators */}
                        <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            {
                                selectedImages.map((val, index) => {
                                    return (
                                        <button type="button" key={index} className={`w-3 h-3 rounded-full ${imageVisible == index ? 'bg-gray-800' : 'bg-gray-500'}`}></button>
                                    )
                                })
                            }
                        </div>
                        {/* Slider controls */}
                        <button type="button" onClick={() => { setImageVisible(imageVisible == 0 ? selectedImages.length - 1 : (imageVisible - 1) % selectedImages.length) }} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60   dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" onClick={() => { setImageVisible((imageVisible + 1) % selectedImages.length) }} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" >
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-black/30 dark:bg-gray-800/30 group-hover:bg-black/50 dark:group-hover:bg-gray-800/60   dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    </div>
                    <div>
                        <div className="mt-4 flex items-center">
                            <div onClick={() => { setImageCenter(!imageCenter) }} class={`border-slate-400 border mr-2 inline-flex items-center justify-center bg-${imageCenter ? 'blue-500' : 'white'}`} style={{ 'height': '16px', 'width': '16px', 'border-radius': '4px' }}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="tick-icon"><path d="M8.41803 0.168978L3.71311 4.52706L1.63115 2.59857C1.36885 2.35561 0.959016 2.35561 0.696721 2.59857C0.434426 2.84153 0.434426 3.22115 0.696721 3.46411L3.2377 5.81778C3.36885 5.93926 3.53279 6 3.69672 6C3.86066 6 4.04098 5.93926 4.15574 5.81778L9.30328 1.04971C9.56557 0.806747 9.56557 0.427123 9.30328 0.184163C9.09016 -0.0587957 8.66393 -0.0587958 8.41803 0.168978Z" fill="white"></path></svg>
                            </div>
                            <span>Center the images</span>
                        </div>
                        <div className="mt-4 flex items-center">
                            <div onClick={(e) => { setFitPage(!fitPage);setSelectedImages(selectedImages) }} class={`border-slate-400 border mr-2 inline-flex items-center justify-center bg-${fitPage ? 'blue-500' : 'white'}`} style={{ 'height': '16px', 'width': '16px', 'border-radius': '4px' }}>
                                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="tick-icon"><path d="M8.41803 0.168978L3.71311 4.52706L1.63115 2.59857C1.36885 2.35561 0.959016 2.35561 0.696721 2.59857C0.434426 2.84153 0.434426 3.22115 0.696721 3.46411L3.2377 5.81778C3.36885 5.93926 3.53279 6 3.69672 6C3.86066 6 4.04098 5.93926 4.15574 5.81778L9.30328 1.04971C9.56557 0.806747 9.56557 0.427123 9.30328 0.184163C9.09016 -0.0587957 8.66393 -0.0587958 8.41803 0.168978Z" fill="white"></path></svg>
                            </div>
                            <span>Fit to page</span>
                        </div>
                        <div className="mt-10">
                            <button onClick={convertToPdf} className=" px-4 py-2 text-white text-xl bg-blue-500 hover:bg-zinc-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm ">
                                Convert

                            </button>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
};

export default PdfConverter;
