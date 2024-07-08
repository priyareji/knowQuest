export const UserRolesEnum = {
    ADMIN: "ADMIN",
    INSTRUCTOR:"INSTRUCTOR",
    STUDENT:"STUDENT"
  }as const;

  type UserRole = typeof UserRolesEnum[keyof typeof UserRolesEnum];