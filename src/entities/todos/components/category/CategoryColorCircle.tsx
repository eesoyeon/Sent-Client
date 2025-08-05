interface CategoryColorCircleProps {
  size: string;
  color: string;
}

const CategoryColorCircle = ({ size, color }: CategoryColorCircleProps) => {
  return <div className={`rounded-full ${size}`} style={{ backgroundColor: color }} />;
};

export default CategoryColorCircle;
