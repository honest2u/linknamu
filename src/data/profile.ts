// 프로필과 링크 목록은 이 파일에서 수정하세요.

export type LinkItem = {
  id: string; // 클릭 수를 저장할 때 쓰는 고유 값 (바꾸면 클릭 수가 새로 시작됨)
  title: string;
  url: string;
};

export const profile = {
  name: "GS",
  bio: "자기소개 칸",
  // public/ 폴더에 이미지를 넣고 경로를 적으세요. 예: "/profile.jpg"
  // 비워두면 이름 첫 글자로 된 기본 아바타가 표시됩니다.
  image: "",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "blog", title: "블로그", url: "https://example.com" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com" },
];
