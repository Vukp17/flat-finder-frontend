import Apartments from "./Apartments";
import Navbar from "./Navbar";
import Footer from "./Footer";
import React, { useState } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div>
      <Navbar />
      <Apartments currentPage={currentPage} onPageChange={handlePageChange} />
      <Footer />
    </div>
  );
}

export default App;
