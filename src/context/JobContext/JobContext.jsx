import { createContext, useContext, useState, useEffect } from 'react';
import { getJobById, getJobs } from '../../services/jobs';
import { useUser } from '../UserContext/UserContext';

// gives the children access to the info for a job. To be used in editForm, jobCard, etc...
function useJob(id) {
  const [job, setJob] = useState({
    notes: '',
    deadline: '',
    company: '',
    position: '',
    completion: false,
  });
  const [loading, setLoading] = useState(true);
  // we might need to grab our user and put it into the dependency array

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const resp = await getJobById(id);
        console.log('resp', resp);
        setJob(resp);
      } catch (error) {
        setJob({
          notes: '',
          deadline: '',
          company: '',
          position: '',
          completion: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);

  return { job, loading };
}

export { useJob };
