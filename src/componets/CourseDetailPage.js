// src/pages/CourseDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const CourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                console.log("Fetching course with ID:", id);

                const docRef = doc(db, "courses", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    console.error("No such course found!");
                    setError("Course not found.");
                    return;
                }

                const courseData = docSnap.data();
                console.log("Fetched course data:", courseData);

                // Ensure content is parsed correctly
                let parsedContent = courseData.content;
                if (typeof parsedContent === "string") {
                    try {
                        // Remove backticks and potential markdown formatting
                        parsedContent = parsedContent.replace(/```json|```/g, "").trim();
                        parsedContent = JSON.parse(parsedContent);
                    } catch (err) {
                        console.error("Error parsing course content:", err);
                        setError("Invalid course data format.");
                        return;
                    }
                }

                setCourse({ id: docSnap.id, ...courseData, content: parsedContent });
            } catch (error) {
                console.error("Error fetching course:", error);
                setError("Failed to load course details.");
            }
        };

        fetchCourse();
    }, [id]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!course) {
        return <p>Loading course details...</p>;
    }

    const modules = course.content?.modules || [];
    const currentModule = modules[currentModuleIndex];

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>{course.content.skill}: {course.content.description}</h1>
            <p><strong>Duration:</strong> {course.content.duration}</p>

            <hr />

            {currentModule ? (
                <>
                    <h2>Module {currentModuleIndex + 1}: {currentModule.title}</h2>
                    <h3>Schedule:</h3>
                    <ul>
                        {currentModule.schedule.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h3>Tasks & Exercises:</h3>
                    <ul>
                        {currentModule.tasks.map((task, index) => (
                            <li key={index}>{task}</li>
                        ))}
                    </ul>

                    <h3>Quiz:</h3>
                    <p>{currentModule.quiz}</p>

                    <h3>Lecture Notes:</h3>
                    <ul>
                        {currentModule.lectureNotes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                        <button
                            onClick={() => setCurrentModuleIndex(currentModuleIndex - 1)}
                            disabled={currentModuleIndex === 0}
                            style={{ padding: "10px", cursor: currentModuleIndex === 0 ? "not-allowed" : "pointer" }}
                        >
                            Previous Module
                        </button>

                        <button
                            onClick={() => setCurrentModuleIndex(currentModuleIndex + 1)}
                            disabled={currentModuleIndex === modules.length - 1}
                            style={{
                                padding: "10px",
                                cursor: currentModuleIndex === modules.length - 1 ? "not-allowed" : "pointer",
                            }}
                        >
                            Next Module
                        </button>
                    </div>
                </>
            ) : (
                <p>No modules found.</p>
            )}
        </div>
    );
};

export default CourseDetailPage;
