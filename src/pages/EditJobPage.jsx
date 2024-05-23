import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";


const EditJobPage = () => {

  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, []);
  

    
  return (
    <div>{job.title}</div>
  )
}

export default EditJobPage