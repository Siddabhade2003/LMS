package com.example.forms.repository;

import com.example.forms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Existing method to find a course by exact title
    Course findByTitle(String title);

    // New method to find courses where the title contains a specified string (case-insensitive)
    List<Course> findByTitleContainingIgnoreCase(String title);
}
