export type Birthday = {
  id: string;
  name: string;
  relation: string;
  birthDate: string;
  color: string;
};

export const birthdays: Birthday[] = [
  {
    id: "1",
    name: "Dad",
    relation: "Father",
    birthDate: "1970-03-15",
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Mom",
    relation: "Mother",
    birthDate: "1972-07-22",
    color: "#ec4899",
  },
  {
    id: "3",
    name: "Sister",
    relation: "Sister",
    birthDate: "1998-11-05",
    color: "#8b5cf6",
  },
  {
    id: "4",
    name: "Best Friend",
    relation: "Friend",
    birthDate: "1995-12-25",
    color: "#10b981",
  },
];
