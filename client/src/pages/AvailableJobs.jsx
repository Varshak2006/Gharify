import { useEffect,useState } from "react";
import Api from "../services/api";
export default function AvailableJobs(){
    const [jobs,setJobs]=useState([]);
    useEffect(()=>{
        fetchJobs();
    },[]);

    const fetchJobs=async ()=>{
        try{
            const token=localStorage.getItem("token");
            const res=await Api.get(
                "bookings/available-jobs",
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setJobs(res.data);
        } catch(error){
            console.log(error);
        }
    };
    const handleAccept = async (bookingId) => {
  try {

    const token = localStorage.getItem("token");

    await Api.patch(
      `/bookings/${bookingId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Job Accepted");

    fetchJobs();

  } catch (error) {
    console.log(error);
    alert("Failed to accept job");
  }
};
    return(
        <div>
            <h1>Available Jobs</h1>
            {
                jobs.map((job)=>(
                    <div
                    key={job._id}
                    style={{border:"1px solid gray",
                        margin:"10px",
                        paadding:"10px"
                    }}>
                        <h3>{job.serviceId?.serviceName}</h3>
                        <p>Customer:{job.customerId?.name}</p>
                        <p>Address:{job.address}</p>
                        <p>Status:{job.status}</p>
                        <button onClick={()=>handleAccept(job._id)}>Accept Job</button>
                        </div>
                ))
            }
        </div>
    );
}