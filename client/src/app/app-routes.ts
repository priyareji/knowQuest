export const ROUTES = {
  ADMIN: {
    MANAGE_BATCHES: ['admin', 'manage-batches'],
    MANAGE_COURSES: ['admin', 'manage-courses'],
    MANAGE_INSTRUCTORS: ['admin', 'manage-instructors'],
    MANAGE_MODE: ['admin', 'manage-mode'],
    MANAGE_STUDENT: ['admin', 'manage-student'],
    MANAGE_SUBJECT: ['admin', 'manage-subject'],
    EDIT_INSTRUCTOR: (instructorId: string) => ['admin', 'edit-instructor', instructorId],
    EDIT_STUDENT: (studentId: string) => ['admin', 'edit-student', studentId]
  }
};
