export interface CourseCompletion {
  courseId: number;
  completedDate: string;
}

export interface UserBadges {
  beginnerBadge: boolean;  // Unlocked after 2 courses
  intermediateBadge: boolean;  // Unlocked after 4 courses
} 