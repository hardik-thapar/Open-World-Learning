export const isCourseCompleted = (courseId: string | number): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    return !!completedCourses[courseId];
  } catch (error) {
    console.error('Error checking course completion:', error);
    return false;
  }
};

export const markCourseCompleted = (courseId: string | number, completed: boolean = true): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const completedCourses = JSON.parse(localStorage.getItem('completedCourses') || '{}');
    completedCourses[courseId] = completed;
    localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
  } catch (error) {
    console.error('Error marking course completion:', error);
  }
}; 