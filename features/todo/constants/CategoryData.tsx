import { Category } from "@/features/todo/types/TodoTypes";
import { getIconComponent } from "@/lib/icons";

// const getIcon = getIconComponent();

interface CircleProps {
  color: string;
}

const Circle = ({ color }: CircleProps) => {
  return (
    <div
      className={`w-2 h-2 rounded-full`}
      style={{ backgroundColor: color }}
    />
  );
};

export const categoryData: Category[] = [
  {
    id: "Work",
    name: "Work",
    color: "#60a5fa",
    icon: "briefcase",
    colorCircle: <Circle color="#60a5fa" />,
  },
  {
    id: "Personal",
    name: "Personal",
    color: "#4ade80",
    icon: "home",
    colorCircle: <Circle color="#4ade80" />,
  },
  {
    id: "Health",
    name: "Health",
    color: "#f87171",
    icon: "heart",
    colorCircle: <Circle color="#f87171" />,
  },
  {
    id: "Learning",
    name: "Learning",
    color: "#c084fc",
    icon: "book-open",
    colorCircle: <Circle color="#c084fc" />,
  },
  {
    id: "Daily",
    name: "Daily",
    color: "#facc15",
    icon: "star",
    colorCircle: <Circle color="#facc15" />,
  },
  {
    id: "Hobby",
    name: "Hobby",
    color: "#f472b6",
    icon: "camera",
    colorCircle: <Circle color="#f472b6" />,
  },
  {
    id: "Health",
    name: "Health",
    color: "#f87171",
    icon: "heart",
    colorCircle: <Circle color="#f87171" />,
  },
  {
    id: "Learning",
    name: "Learning",
    color: "#c084fc",
    icon: "book-open",
    colorCircle: <Circle color="#c084fc" />,
  },
  {
    id: "Daily",
    name: "Daily",
    color: "#facc15",
    icon: "star",
    colorCircle: <Circle color="#facc15" />,
  },
  {
    id: "Hobby",
    name: "Hobby",
    color: "#f472b6",
    icon: "camera",
    colorCircle: <Circle color="#f472b6" />,
  },
];
