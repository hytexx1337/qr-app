import { useRef, useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

export function QRConLogo() {
  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("https://google.com");
  const [logo, setLogo] = useState<string>("");

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
      <h1 style={{ margin: "20px 0 8px 0", fontSize: "24px", color: "#fff" }}>
        QR Generator
      </h1>
      <p style={{ margin: "0 0 16px 0", fontSize: "14px", color: "#999" }}>
        Add your URL and upload your logo or whatever you want to make your own QR code
      </p>
      
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "14px",
          width: "300px",
        }}
      />
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: "8px 16px",
          border: "1px solid #007AFF",
          borderRadius: "4px",
          backgroundColor: "white",
          color: "#007AFF",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Upload
      </button>

      <div
        ref={qrRef}
        style={{ position: "relative", display: "inline-block" }}
      >
        <QRCodeCanvas
          value={url}
          size={300}
          level="M"
          marginSize={2}
          imageSettings={logo ? {
            src: logo,
            x: undefined,
            y: undefined,
            height: 60,
            width: 60,
            excavate: true,
          } : undefined}
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
        📥 Download
      </button>
    </div>
  );
}

function App() {
  return <QRConLogo />;
}

export default App;
