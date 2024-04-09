import { useEffect, useState } from "react";
import Courses from "./Courses";

export type Course = { 
  _id?: string
  "title": string, 
  "description": string, 
  "price": number, 
  "imageLink": string, 
  "published": boolean 
};

const AllCourses = () => {
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

  return (
    <div>
      <Courses courses={courses} purchased={false}/>
    </div>
  )
};

export default AllCourses;