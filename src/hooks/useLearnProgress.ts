"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface LessonProgress {
    completedLessons: string[]; // Array of lesson IDs
    currentLessonIndex: number;
    lastAccessed: string;
}

export interface ModuleProgress {
    [moduleId: string]: LessonProgress;
}

export function useLearnProgress() {
    const { user } = useAuth();
    const [progress, setProgress] = useState<ModuleProgress>({});
    const [loading, setLoading] = useState(true);

    // Load progress from Firebase
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const loadProgress = async () => {
            try {
                const progressRef = doc(db, "learnProgress", user.id);
                const progressSnap = await getDoc(progressRef);

                if (progressSnap.exists()) {
                    setProgress(progressSnap.data() as ModuleProgress);
                } else {
                    // Initialize empty progress
                    const initialProgress: ModuleProgress = {};
                    await setDoc(progressRef, initialProgress);
                    setProgress(initialProgress);
                }
            } catch (error) {
                console.error("Error loading learn progress:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, [user]);

    // Mark lesson as complete
    const markLessonComplete = async (moduleId: string, lessonId: string, lessonIndex: number) => {
        if (!user) return;

        try {
            const moduleProgress = progress[moduleId] || {
                completedLessons: [],
                currentLessonIndex: 0,
                lastAccessed: new Date().toISOString()
            };

            // Add lesson to completed if not already there
            if (!moduleProgress.completedLessons.includes(lessonId)) {
                moduleProgress.completedLessons.push(lessonId);
            }

            // Update current lesson index to next lesson
            moduleProgress.currentLessonIndex = lessonIndex + 1;
            moduleProgress.lastAccessed = new Date().toISOString();

            const updatedProgress = {
                ...progress,
                [moduleId]: moduleProgress
            };

            // Save to Firebase
            const progressRef = doc(db, "learnProgress", user.id);
            const progressSnap = await getDoc(progressRef);

            if (progressSnap.exists()) {
                await updateDoc(progressRef, updatedProgress);
            } else {
                await setDoc(progressRef, updatedProgress);
            }

            setProgress(updatedProgress);
        } catch (error) {
            console.error("Error marking lesson complete:", error);
        }
    };

    // Check if user can access a lesson (sequential progression)
    const canAccessLesson = (moduleId: string, lessonIndex: number): boolean => {
        if (!user) return lessonIndex === 0; // Non-authenticated users can only access first lesson

        const moduleProgress = progress[moduleId];

        // First lesson is always accessible
        if (lessonIndex === 0) return true;

        // Can access if previous lesson is completed
        if (!moduleProgress) return false;

        return moduleProgress.currentLessonIndex >= lessonIndex;
    };

    // Get lesson status
    const getLessonStatus = (moduleId: string, lessonId: string): "locked" | "available" | "completed" => {
        if (!user) return "locked";

        const moduleProgress = progress[moduleId];
        if (!moduleProgress) return "locked";

        if (moduleProgress.completedLessons.includes(lessonId)) {
            return "completed";
        }

        return "available";
    };

    // Get module progress percentage
    const getModuleProgress = (moduleId: string, totalLessons: number): number => {
        if (!user) return 0;

        const moduleProgress = progress[moduleId];
        if (!moduleProgress) return 0;

        return Math.round((moduleProgress.completedLessons.length / totalLessons) * 100);
    };

    // Get completed lessons count
    const getCompletedLessonsCount = (moduleId: string): number => {
        if (!user) return 0;

        const moduleProgress = progress[moduleId];
        return moduleProgress?.completedLessons.length || 0;
    };

    return {
        progress,
        loading,
        markLessonComplete,
        canAccessLesson,
        getLessonStatus,
        getModuleProgress,
        getCompletedLessonsCount
    };
}
