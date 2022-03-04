import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext/UserContext';
import { getJobs } from '../../services/jobs';
import Complete from './Complete';
import InProgress from './InProgress';

export default function JobList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const resp = await getJobs({ user_id: user.id });
        console.log('resp :>> ', resp);
        setJobs(resp);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex justify-between justify-self-auto">
      <Complete jobs={jobs.filter((job) => job.completion)} />
      <InProgress jobs={jobs.filter((job) => !job.completion)} />
    </div>
  );
}
