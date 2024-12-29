/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiMiniBars3BottomRight } from 'react-icons/hi2';
import { HEADER_ITEMS } from '../../constant/header';
import { User } from '../../data/users';
import { useUser } from '../../context/userContext';
import UserProfile from './user/UserProfile';

const Header = () => {
  const [sticky, setSticky] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>('/');
  const [clicked, setClicked] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, setUser } = useUser();

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    router.push('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    setClicked(false);
  };

  //mobile navbar
  const [mobile, setMobile] = useState(false);

  //open
  const handleMobileOpen = () => {
    setMobile(!mobile);
  };

  //close
  const handleMobileClose = () => {
    setMobile(false);
  };

  useEffect(() => {
    //update active link state when the page is reloaded
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <header className={sticky ? 'sticky' : ''}>
      <nav className="container flex flex-sb">
        <div className="logo flex gap-2">
          <Link href={'/'}>
            <img src="/rajaongkir.svg" alt="logo" />
          </Link>
        </div>
        <div className="navlist flex gap-2">
          <ul className="flex gap-2">
            {HEADER_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  onClick={() => handleLinkClick(item.href)}
                  className={activeLink === item.href ? 'active' : ''}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <UserProfile user={user} handleLogout={handleLogout} />

          <div className="mobiletogglesvg" onClick={handleMobileOpen}>
            <HiMiniBars3BottomRight />
          </div>
        </div>

        <div className={mobile ? 'mobilenavlist active' : 'mobilenavlist'}>
          <span
            onClick={handleMobileClose}
            className={mobile ? 'active' : ''}
          ></span>
          <div className="mobilelogo">
            <img src="/rajaongkir.svg" alt="logo" />
            <h2>Raja Ongkir</h2>
          </div>
          <ul
            className="flex gap-1 flex-col flex-left mt-3"
            onClick={handleMobileClose}
          >
            {HEADER_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  onClick={() => handleLinkClick(item.href)}
                  className={activeLink === item.href ? 'active' : ''}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Copyright &copy; 2024 | Pramuja</p>
        </div>
      </nav>
    </header>
  );
};

export default Header;
