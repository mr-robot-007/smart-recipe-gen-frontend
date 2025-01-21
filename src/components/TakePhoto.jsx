import React, { useRef } from "react";

export default function TakePhoto() {
  const fileInputRef = useRef(null);

  const handleCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Captured photo:", file);
      // Optional: Create a preview or process the file as needed
      const imageUrl = URL.createObjectURL(file);
      console.log("Preview URL:", imageUrl);
    } else {
      alert("No photo captured.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleCapture}
        capture
      />
      <button
        className="bg-orange-500 w-full text-white sm:w-auto p-2 font-medium rounded-lg"
        onClick={handleButtonClick}
      >
        Take a photo
      </button>
    </>
  );
}
