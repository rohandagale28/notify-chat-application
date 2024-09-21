import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface RequestProps {
  id: string;
}

export const Request: React.FC<RequestProps> = ({ id }) => {
  const [data, setData] = useState<any>(null);
  console.log(id, 'this is the id in frontend');

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/friend/request/${id}`, { withCredentials: true });
      setData(response.data.data); // Adjust if the response structure changes
      console.log(response, 'this is the response data'); // Log the full response data
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [id]); // Dependency array to re-fetch when id changes

  return (
    <div>
      {data && (
        <div>
          <h3>Pending Users</h3>
          {data[0]?.pendingUsers?.map((item: any) => (
            <React.Fragment key={item._id}>
              <h3>{item.username}</h3>
            </React.Fragment>
          ))}

          <h3>Contact Users</h3>
          {data.contactUsers?.map((item: any) => <React.Fragment key={item._id}>{item.username}</React.Fragment>)}
        </div>
      )}
    </div>
  );
};
