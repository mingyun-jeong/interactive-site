"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm" 
          : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site name */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`${scrolled ? "bg-indigo-100 dark:bg-indigo-900" : "bg-white"} p-2 rounded-full`}>
              <Home className={`h-5 w-5 ${scrolled ? "text-indigo-700 dark:text-indigo-300" : "text-indigo-600"}`} />
            </div>
            <span className={`font-bold text-lg ${scrolled ? "text-slate-800 dark:text-white" : "text-white"}`}>
              인터랙티브 테스트
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/quizzes/mbti" 
              className={`${scrolled 
                ? isActive("/quizzes/mbti") 
                  ? "text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400" 
                : isActive("/quizzes/mbti")
                  ? "text-white font-medium"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              MBTI 테스트
            </Link>
            <Link 
              href="/quizzes/love" 
              className={`${scrolled 
                ? isActive("/quizzes/love") 
                  ? "text-indigo-600 dark:text-indigo-400 font-medium" 
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400" 
                : isActive("/quizzes/love")
                  ? "text-white font-medium"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              연애 테스트
            </Link>
            <Link 
              href="/quizzes/iq" 
              className={`${scrolled 
                ? isActive("/quizzes/iq") 
                  ? "text-indigo-600 dark:text-indigo-400 font-medium" 
                  : "text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400" 
                : isActive("/quizzes/iq")
                  ? "text-white font-medium"
                  : "text-white/80 hover:text-white"
              } transition-colors`}
            >
              IQ 테스트
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full ${
                scrolled 
                  ? "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" 
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/quizzes/mbti"
              className={`block px-3 py-2 rounded-md ${
                isActive("/quizzes/mbti")
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              MBTI 테스트
            </Link>
            <Link
              href="/quizzes/love"
              className={`block px-3 py-2 rounded-md ${
                isActive("/quizzes/love")
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              연애 테스트
            </Link>
            <Link
              href="/quizzes/iq"
              className={`block px-3 py-2 rounded-md ${
                isActive("/quizzes/iq")
                  ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              IQ 테스트
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 