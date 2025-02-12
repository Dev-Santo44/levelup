// src/components/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.id}`); // Navigate to course details page
  };

  // Handle Firestore timestamps correctly
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown"; // Handle missing date
    const date =
      timestamp.seconds
        ? new Date(timestamp.seconds * 1000) // Firestore Timestamp
        : new Date(timestamp); // Handle Date objects
    return date.toLocaleDateString();
  };

  // Delete Course Function
  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent clicking on the card while deleting

    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "courses", course.id)); // Delete from Firestore
      alert("Course deleted successfully!");
      window.location.reload(); // Refresh the page to update the course list
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete the course.");
    }
  };

  return (
    
    <div
      onClick={handleClick}
      style={{
        width: "250px",
        border: "1px solid #ddd",
        padding: "15px",
        margin: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
        background: "#fff",
        position: "relative",
        
      }}
    >
      <h3>{course.skill}</h3>
      <p>Created on: {formatDate(course.createdAt)}</p>
      <p>{course.description || "No description available."}</p>
      
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default CourseCard;
