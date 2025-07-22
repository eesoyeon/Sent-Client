"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderNavigationProps {
  title?: string;
  currentPage: "dashboard" | "todos" | "memos" | "social" | "profile";
}

const HeaderNavigation = ({
  title = "SENT",
  currentPage,
}: HeaderNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const settingItems = [
    { title: "Todos", currentPage: "todos" },
    { title: "Memos", currentPage: "memos" },
    { title: "Social", currentPage: "social" },
  ];

  const navItems = [
    { id: "view", label: "View", href: "/todos" },
    { id: "category", label: "Category", href: "/todos" },
  ];

  // const navItems = [
  //   { id: "dashboard", label: "홈", icon: Home, href: "/" },
  //   { id: "todos", label: "Todos", icon: CheckSquare, href: "/todos" },
  //   { id: "memos", label: "메모", icon: StickyNote, href: "/memos" },
  //   { id: "social", label: "소셜", icon: Users, href: "/social" },
  //   { id: "profile", label: "프로필", icon: User, href: "/profile" },
  // ];

  const handleNavigation = (href: string) => {
    setIsMenuOpen(false);

    // 페이지 전환 애니메이션
    document.body.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = href;
    }, 150);
  };

  return (
    <>
      {/* 상단 네비게이션 바 */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b-none border-gray-800 z-50">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="w-10" /> {/* 균형을 위한 빈 공간 */}
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(true)}
            className="text-gray-100 hover:text-white rounded-full p-2"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* 사이드 메뉴 */}
      {isMenuOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed bg-black/0 inset-0 z-40 transition-opacity duration-300 fade-in"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* 사이드 드로어 */}
          <div className="fixed top-3 left-3 right-3 m-auto h-[80%] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl z-50 slide-in-from-right-10 border border-white/10">
            <div className="px-3 py-3">
              {/* 헤더 */}
              <header className="flex items-center justify-between mb-2">
                {settingItems.map((setting) => {
                  if ("/" + setting.currentPage === pathName)
                    return (
                      <h2 className="font-medium text-gray-400 p-2">
                        {setting.title}
                      </h2>
                    );
                })}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white rounded-full p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </header>

              {/* 네비게이션 아이템들 */}
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  const isActive = currentPage === item.id;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      // variant="ghost"
                      // onClick={() => handleNavigation(item.href)}
                      className={`w-full justify-start p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-gray-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <span className="text-3xl font-extralight text-white">
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HeaderNavigation;
