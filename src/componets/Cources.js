import React, { useState } from "react";
import { generateCourse } from "../services/geminiApi";
import { db } from "../services/firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth"; // Import authentication hook
import '../styles/Cources.css';
import '../styles/btn.css';
const Courses = () => {
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the logged-in user

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("You must be logged in to create a course.");
      return;
    }

    setLoading(true);

    try {
      // Generate course content using Gemini AI
      const courseText = await generateCourse(skill);

      // Try parsing AI response
      let course;
      try {
        course = JSON.parse(courseText);
      } catch {
        console.warn("AI response is not JSON. Storing raw text.");
        course = { content: courseText };
      }

      // Ensure valid course data
      if (!course || Object.keys(course).length === 0) {
        throw new Error("Invalid course data received.");
      }

      // Save course to Firestore
      const docRef = await addDoc(collection(db, "courses"), {
        userId: user.uid, // Store the user's ID
        skill,
        ...course,
        createdAt: new Date(),
      });

      console.log("Course created with ID:", docRef.id);
      navigate("/learning"); // Redirect user to /learning page
    } catch (error) {
      console.error("Error creating course:", error);
      setError("Failed to create the course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create a New Course</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="formConatiner">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a skill to learn"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Creating Course..." : "Create Course"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default Courses;
