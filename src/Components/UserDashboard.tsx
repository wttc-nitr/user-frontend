import { useEffect, useState } from "react";
import Courses from "./Courses";
import { Link } from "react-router-dom";
import { Course } from "./AllCourses";

const UserDashboard = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchData = async () => {
    const data = await fetch('http://localhost:3000/user/purchasedCourses', {
      method: 'get',
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    });

    const json = await data.json();
    // console.log(json);

    setDataLoaded(true);
    setCourses(json.purchasedCourses);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataLoaded)
    return <div>Loading dashboard...</div>;

  return (
    <div className="mx-auto">
      <h2>User Dashboard</h2>
      <h2>Hi there user</h2>
      <h3>Your Purchased courses:</h3>
      <div className="m-2 p-2 flex flex-wrap justify-center">
        <Courses courses={courses} purchased={true}/>
      </div>

      <Link to={'/user/courses'}>
        <h3 className="p-4 mx-auto my-4 bg-gray-100 shadow-lg">Browse All Courses:</h3>
      </Link>

    </div>
  )
};

export default UserDashboard;