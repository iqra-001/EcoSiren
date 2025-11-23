import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { HomePage } from "../components/HomePage";
import { MapPage } from "../components/MapPage";
import { ImpactPage } from "../components/ImpactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "map":
        return <MapPage onNavigate={setCurrentPage} />;
      case "impact":
        return <ImpactPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
