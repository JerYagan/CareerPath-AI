import type { ProfileBase } from "@/types/profile";

export const computeCompletion = (profile: ProfileBase): number => {
  let score = 0;

  const basicFields = [
    profile.name,
    profile.position,
    profile.location,
    profile.email,
    profile.phone,
    profile.description,
    profile.profilePicture,
  ];
  const validBasic = basicFields.filter(
    (x) => x && String(x).trim().length > 0
  ).length;
  score += (validBasic / basicFields.length) * 25;

  // Experience: 20%
  if (Array.isArray(profile.experience) && profile.experience.length > 0) {
    score += 20;
  }

  // Skills: 20% (scaled up to 3)
  if (Array.isArray(profile.skills) && profile.skills.length > 0) {
    const maxSkills = 3;
    const validSkills = profile.skills.filter(
      (s) => s.name && s.level > 0
    ).length;
    score += (Math.min(validSkills, maxSkills) / maxSkills) * 20;
  }

  // Roadmap: 15%
  if (Array.isArray(profile.roadmap) && profile.roadmap.length > 0) {
    score += 15;
  }

  // Certificates: 10%
  if (
    Array.isArray(profile.certifications) &&
    profile.certifications.length > 0
  ) {
    score += 10;
  }

  if (profile.resume?.url) {
    score += 5;
  }

  if (Array.isArray(profile.languages) && profile.languages.length > 0) {
    score += 5;
  }

  return Math.round(Math.min(score, 100));
};