import { SetStateAction, atom, useAtom } from "jotai";

export enum UserRole {
  Admin = "Admin",
  Privileged = "Privileged",
  None = "None",
}
export const RoleClaimName = "extension_Role";

const userRole = atom<UserRole>(UserRole.None);

const useUserRole = () => {
  const [role, setUserRoleOriginal] = useAtom(userRole);
  const setUserRole = (newRole?: string) => {
    switch (newRole?.toLowerCase()) {
      case "admin":
        setUserRoleOriginal(UserRole.Admin);
        break;
      case "privileged":
        setUserRoleOriginal(UserRole.Privileged);
        break;
    }
  };

  return [role, setUserRole] as const;
};

export default useUserRole;
