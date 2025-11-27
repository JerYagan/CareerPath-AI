import { useState } from "react";
import { computeCompletion } from "@/helpers/profileCompletion";
import type { ProfileBase, Profile } from "@/types/profile";

export const useProfileState = (initialData: ProfileBase) => {
  const [profile, setProfile] = useState<Profile>(() => {
    const base: ProfileBase = { ...initialData };
    const completion = computeCompletion(base);
    return { ...base, completion };
  });

  const recalcProfile = (
    updater: (prev: Profile) => ProfileBase | Profile
  ): void => {
    setProfile((prev) => {
      const updatedBase = updater(prev);
      const completion = computeCompletion(updatedBase);
      return { ...(updatedBase as ProfileBase), completion };
    });
  };

  return { profile, recalcProfile };
};