import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface IDCardProps {
  name: string;
}

const IDCard: React.FC<IDCardProps> = ({ name }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadIDCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, {
        width: 600,
        height: 600,
      });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [600, 600],
      });

      pdf.addImage(imgData, "PNG", 0, 0, 600, 600);
      pdf.save("id-card.pdf");
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={downloadIDCard}
        className="absolute top-5 w-full max-w-[600px] bg-blue-500 text-white py-2 px-4 rounded"
      >
        Download
      </button>
      <div
        className="relative flex justify-center id-card rounded-md shadow-md"
        ref={cardRef}
        style={{ width: "600px", height: "600px" }}
      >
        <img
          src="/hbadge.png"
          className="w-full h-full rounded-md object-cover"
          alt="ID Background"
        />
        <h2 className="text-5xl top-[40%] h-fit pb-8 z-50 text-[#F56E0F] absolute font-bold">
          {name}
        </h2>
      </div>
    </div>
  );
};

export default IDCard;
