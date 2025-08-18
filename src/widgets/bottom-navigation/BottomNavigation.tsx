import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { id: 'Todos', label: 'Todo', href: '/todos' },
  { id: 'Memos', label: 'Memo', href: '/memos' },
  { id: 'Social', label: 'Social', href: '/social' },
];

const BottomNavigation = () => {
  const pathName = usePathname();
  // const isActive = navItems.filter((item) => item.href === pathName);

  // const handleNavigation = () => {
  //   // 페이지 전환 애니메이션
  //   document.body.classList.add('page-exit');

  //   setTimeout(() => {}, 150);
  // };

  return (
    <>
      <nav className="fixed bottom-4 right-0 left-0 flex justify-start items-start w-[330px] m-auto z-40 backdrop-blur-md bg-white/5 shadow-2xl border border-l-0 border-r-0 border-white/30 rounded-full p-1 space-x-[-4px] h-14">
        {navItems.map(item => {
          const isActive = item.href === pathName;

          return (
            <Link
              key={item.id}
              className={`flex justify-center items-center m-auto flex-grow h-full relative rounded-full transition-all duration-200 ease-in-out ${
                isActive &&
                'border border-l-0 border-r-0 border-white/10 backdrop-blur-md bg-white/0 shadow-md'
              }`}
              href={item.href}
            >
              <p
                className={`flex-grow-0 flex-shrink-0 text-xs text-left text-gray-500 ${
                  isActive ? 'text-white font-semibold' : 'font-medium'
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default BottomNavigation;
