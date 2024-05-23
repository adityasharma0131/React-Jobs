import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./pages/NotFoundPage";


const App = () => {
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
      toast.success("Job added successfully!");
      console.log("Job added:", data);
    } catch (error) {
      toast.error("Error adding job: " + error.message);
      console.error("Error adding job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
      toast.success("Job deleted successfully!");
      console.log("Job deleted");
    } catch (error) {
      toast.error("Error deleting job: " + error.message);
      console.error("Error deleting job:", error);
    }
  };

  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/job/:id" element={<JobPage deleteJob={deleteJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage  />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
