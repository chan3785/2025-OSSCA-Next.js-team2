// 프로필 이미지 URL 배열
import profileImage1 from "@/../public/default-profile1.png"
import profileImage2 from "@/../public/default-profile2.png"
import profileImage3 from "@/../public/default-profile3.png"
import profileImage4 from "@/../public/default-profile4.png"
import profileImage5 from "@/../public/default-profile5.png"
import { StaticImageData } from "next/image"

export const profileImages = [
  profileImage1,
  profileImage2,
  profileImage3,
  profileImage4,
  profileImage5
];

// 랜덤으로 프로필 이미지 선택하는 함수
export function getRandomProfileImage(): StaticImageData {
  const randomIndex = Math.floor(Math.random() * profileImages.length);
  return profileImages[randomIndex];
} 