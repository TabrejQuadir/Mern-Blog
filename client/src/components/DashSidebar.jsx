import React, { useEffect, useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { motion } from 'framer-motion';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const sidebarItemsVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.3, // Stagger children with a delay of 0.2 seconds
        type:"spring",
        damping: 5,
        stiffness: 100 
      },
    },
  };

  const sidebarItemVariants = {
    hidden: { opacity: 0, y:-20, scale:.5 },
    visible: { opacity: 1, y:0, scale:1  },
  };

  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <motion.div
          variants={sidebarItemsVariants}
          initial="hidden"
          animate="visible"
        >
          <Sidebar.ItemGroup className='flex flex-col gap-1'>
            {currentUser && currentUser.isAdmin && (
              <Link to='/dashboard?tab=dash'>
                <motion.div variants={sidebarItemVariants}>
                  <Sidebar.Item
                    active={tab === 'dash' || !tab}
                    icon={HiChartPie}
                    as='div'
                  >
                    Dashboard
                  </Sidebar.Item>
                </motion.div>
              </Link>
            )}
            <Link to='/dashboard?tab=profile'>
              <motion.div variants={sidebarItemVariants}>
                <Sidebar.Item
                  active={tab === 'profile'}
                  icon={HiUser}
                  label={currentUser.isAdmin ? 'Admin' : 'User'}
                  labelColor='dark'
                  as='div'
                >
                  Profile
                </Sidebar.Item>
              </motion.div>
            </Link>
            {currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
                <motion.div variants={sidebarItemVariants}>
                  <Sidebar.Item
                    active={tab === 'posts'}
                    icon={HiDocumentText}
                    as='div'
                  >
                    Posts
                  </Sidebar.Item>
                </motion.div>
              </Link>
            )}
            {currentUser.isAdmin && (
              <>
                <Link to='/dashboard?tab=users'>
                  <motion.div variants={sidebarItemVariants}>
                    <Sidebar.Item
                      active={tab === 'users'}
                      icon={HiOutlineUserGroup}
                      as='div'
                    >
                      Users
                    </Sidebar.Item>
                  </motion.div>
                </Link>
                <Link to='/dashboard?tab=comments'>
                  <motion.div variants={sidebarItemVariants}>
                    <Sidebar.Item
                      active={tab === 'comments'}
                      icon={HiAnnotation}
                      as='div'
                    >
                      Comments
                    </Sidebar.Item>
                  </motion.div>
                </Link>
              </>
            )}
            <motion.div variants={sidebarItemVariants}>
              <Sidebar.Item
                icon={HiArrowSmRight}
                className='cursor-pointer'
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </motion.div>
          </Sidebar.ItemGroup>
        </motion.div>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
