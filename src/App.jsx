import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    try {
      const res = await fetch("/api/jobs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
      const data = await res.json();
      console.log("Job added:", data);
      // Handle state update if necessary
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // Delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/job/:id" element={<JobPage deleteJob={deleteJob}/>} />
        <Route
          path="/add-job" element={<AddJobPage addJobsSubmit={addJob} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
