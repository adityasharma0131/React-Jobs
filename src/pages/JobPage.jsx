import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const JobPage = ( { deleteJob } ) => {

  const navigate = useNavigate();
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
  

  const  onDeleteClick = (jobId) => {
    const confirm = window.confirm('Are you sure you wan to delete this listing?')
    if(!confirm) return;

    deleteJob(jobId);
    navigate('/jobs');
  }




  return loading ? (
    <Spinner />
  ) : (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" /> Back to Job Listings
            </Link>
        </div>
      </section>

      <section>
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-zinc-800 p-6 rounded-lg shadow-md text-center md:text-left hover:bg-indigo-950">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-white text-3xl font-bold mb-4">
                  {job.title}
                </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="fa-solid fa-location-dot text-lg text-red-700 mr-2" />
                  <p className="text-red-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg shadow-md mt-6 hover:bg-indigo-950">
                <h3 className="text-white text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="text-white mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4 text-green-500">{job.salary}</p>
              </div>
            </main>

            <aside>
              <div className="bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-indigo-950">
                <h3 className=" text-white text-xl font-bold mb-6">
                  Company Info
                </h3>

                <h2 className=" text-indigo-800 text-2xl">
                  {job.company["name"]}
                </h2>

                <p className=" text-white my-2">{job.company["description"]}</p>

                <hr className="my-4" />

                <h3 className="text-xl text-gray-600">Contact Email:</h3>

                <p className="my-2 bg-indigo-200 p-2 font-bold rounded">
                  {job.company["contactEmail"]}
                </p>

                <h3 className="text-xl  text-gray-600 ">Contact Phone:</h3>

                <p className="my-2 bg-indigo-200 p-2 font-bold rounded">
                  {job.company["contactPhone"]}
                </p>
              </div>

              <div className="bg-indigo-900 p-6 rounded-lg shadow-md mt-6 ">
                <h3 className=" text-white text-xl font-bold mb-6">
                  Manage Job
                </h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button onClick={ () => onDeleteClick(job.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPage;
