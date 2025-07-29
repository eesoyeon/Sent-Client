interface CategoryColorCircleProps {
  color: string;
}

const CategoryColorCircle = ({ color }: CategoryColorCircleProps) => {
  return <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: color }} />;
};

export default CategoryColorCircle;
