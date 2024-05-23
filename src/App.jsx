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

  const updateJob = async (job) =>{
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!res.ok) {
        throw new Error("Failed to edit job");
      }
      const data = await res.json();
      toast.success("Job Edited successfully!");
    } catch (error) {
      toast.error("Error edited job: " + error.message);
      console.error("Error edited job:", error);
    }
  }


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
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
