interface DrawerSectionProps {
  title?: string;
  items: { id: string; label: string; onClick: () => void }[];
}

const DrawerSection = ({ title, items }: DrawerSectionProps) => {
  if (items.length === 0) return null;

  return (
    <>
      <h2 className="text-gray-500 font-semibold text-sm mb-4">{title}</h2>
      <nav className="flex flex-col space-y-3 mb-10">
        {items.map(item => (
          <button
            key={item.id}
            onClick={item.onClick}
            className="flex w-full justify-start rounded-sm"
          >
            <span className="text-2xl font-light text-white hover:text-gray-400">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default DrawerSection;
