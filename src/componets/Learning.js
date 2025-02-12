import React, { useEffect, useState } from "react";
import { db } from "../services/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../services/auth"; // Import auth hook
import CourseCard from "../componets/CourseCard";

const Learning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get current user

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return; // Ensure user is logged in before fetching

      try {
        const coursesRef = collection(db, "courses");
        const q = query(coursesRef, where("userId", "==", user.uid)); // Fetch only current user's courses
        const querySnapshot = await getDocs(q);
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  return (
    <div>
      <h1>Your Courses</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        {loading ? (
          <p>Loading courses...</p>
        ) : courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course.id} course={course} />)
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Learning;
