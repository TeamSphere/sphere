import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <div>
      <h1>Course List</h1>
      {courses.map(course => (
        <div key={course.ID}>
          <h3>{course.Title}</h3>
          <p>Instructor: {course.Instructor}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;