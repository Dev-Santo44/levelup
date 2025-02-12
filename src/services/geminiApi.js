import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI with your API key
const genAI = new GoogleGenerativeAI("AIzaSyDl1WLo6BldMPGvX7iHtbenM9VofpNgIb8");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateCourse = async (skill) => {
    try {
        const prompt = `Create a detailed course plan for learning ${skill}. 
        Include:
        "skill": title,
        "description": discription about cource,
        "duration": time period of the skill course in weeks,
        create multiple modules for coucee by given way below
        "modules" : in module this should be included in "title","schedule","tasks","lectureNotes"
        for example
        "skill": "JavaScript Mastery",
        "description": "Learn JavaScript from zero to hero...",
        "duration": "8 Weeks",
        "modules": [
            {
            "title": "Introduction to JavaScript",
            "schedule": ["Day 1: Basics", "Day 2: Control Flow"],
            "tasks": ["Write a program to calculate area", "Loop through numbers 1-10"],
            "quiz": "10 multiple-choice questions",
            "lectureNotes": ["JavaScript is a scripting language...", "Variables store data..."]
            },
            {
            "title": "Working with Data Structures",
            "schedule": ["Day 8: Arrays", "Day 9: Objects"],
            "tasks": ["Find largest number in array", "Reverse an array"],
            "quiz": "10 multiple-choice questions",
            "lectureNotes": ["Arrays are ordered collections...", "Objects are key-value pairs..."]
            }
        ]
        
        `;

        // Generate content using the AI model
        const result = await model.generateContent(prompt);
        const response = await result.response.text(); // Extract text response

        return response; // Assuming the response contains structured course data
    } catch (error) {
        console.error("Error generating course:", error);
        return null;
    }
};
