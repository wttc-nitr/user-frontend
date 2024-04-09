import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Course } from "./AllCourses";

const ViewCourse = () => {
  const {purchased} = useLocation().state;
  // console.log(state);
  const {courseId} = useParams();
  const [courses, setCourses] = useState<Course[]>([]);

  const fetchData = async () => {
    const data = await fetch('http://localhost:3000/user/courses', {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem('token')
      }
    });

    const json = await data.json();
    // console.log(json.courses);
    setCourses(json.courses);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (courses.length === 0) {
    return (
      <div>
        <Link to={'/user/dashboard'}>
          <h2 className="text-lg font-semibold">Go-to User-Dashboard</h2>
        </Link>
        <h3>Loading your course...</h3>
      </div>
    )
  }
    

  console.log(courses);
  const course = courses.filter(course => course._id === courseId)[0];
  // console.log(course);
  const {title, description, price} = course;

  // handlePurchase
  const handlePurchase = async () => {
    const data = await fetch('http://localhost:3000/user/courses/' + courseId, {
      method: 'post',
      headers: {
        authorization: "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });

    const json = await data.json();
    console.log(json);

    if (json?.message)
      alert(json.message);
  }

  return (
    <div className="text-center">
      <div>
        <Link to={'/user/dashboard'}>
          <h2 className="text-lg font-semibold m-4 p-4 bg-teal-100 rounded-md shadow-lg">Go-to User-Dashboard</h2>
        </Link>
      </div>

      <div className="mx-auto p-4 my-4 w-1/2 border border-black shadow-xl rounded-lg flex flex-col justify-around">
        <h3>{title}</h3>
        <h3>{description}</h3>
        <h3>{price}</h3>
      </div>

      {
        !purchased && 
        <div className="mx-auto my-3 p-4">
        <button 
          className="inline-block p-2 m-2 w-1/2 bg-amber-300 text-black hover:bg-amber-200 rounded-xl"
          onClick={() => handlePurchase()}
          >
            Purchase this Course
        </button>
      </div>
      }
    </div>
  )
}

export default ViewCourse;