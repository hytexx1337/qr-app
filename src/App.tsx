import { useRef } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";
import xiclos from "./assets/xiclos.png";

export function QRConLogo() {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "new-qr.png";
    link.href = canvas.toDataURL("image/png");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        ref={qrRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <QRCodeCanvas
          value="https://apps.apple.com/us/app/xiclos/id6744620852"
          size={512}
          level="M"
          marginSize={2}
          imageSettings={{
            src: xiclos,
            x: undefined,
            y: undefined,
            height: 90,
            width: 90,
            excavate: true,
          }}
        />
      </div>
      <button
        onClick={downloadQR}
        style={{
          backgroundColor: "#007AFF",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          boxShadow: "0 2px 4px rgba(0, 122, 255, 0.2)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056CC";
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 122, 255, 0.3)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007AFF";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 122, 255, 0.2)";
        }}
      >
        📥 Descargar QR
      </button>
    </div>
  );
}

function App() {
  return <QRConLogo />;
}

export default App;
