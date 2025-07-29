const SideDrawerOverlay = ({ onClick }: { onClick: () => void }) => (
  <div
    className="fixed bg-black/80 inset-0 z-40 transition-opacity duration-300"
    onClick={onClick}
  />
);

export default SideDrawerOverlay;
