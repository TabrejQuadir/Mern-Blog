import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import {motion} from "framer-motion"

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  const headingAinme= {
    hidden:{
      y:-120,
      opacity:.7
    },
    open:{
      y:0,
      opacity:1,
      transition:{
        delay:0.25,
        duration:.30,
        staggerChildren:.75,
        type:"spring",
        damping: 10,
        stiffness: 100 
      }
    }
  }
  const childVariants = {
    hidden: { opacity: 0 , x:-100,},
    open: { opacity: 1,  x:0, transition:{duration:.05, type:"spring",
    damping: 10,
    stiffness: 300 } }
  };

  return (
    <div>
      <motion.div variants={headingAinme} initial="hidden" animate="open"  className='flex flex-col gap-6 p-28  max-w-6xl mx-auto '>
        <motion.h1  variants={headingAinme} 
        className='text-3xl font-bold lg:text-6xl bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text gradient-text  dark:bg-gradient-to-l dark:from-cyan-400  dark:to-yellow-300 dark:text-transparent dark:bg-clip-text'>Welcome to my Blog</motion.h1>
        <motion.p  variants={childVariants} className='text-gray-500 text-xs sm:text-sm'>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </motion.p>
        <motion.div variants={childVariants}>
          <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>View all posts</Link>
        </motion.div>
      </motion.div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-12 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <motion.h2  className='text-2xl font-semibold text-center'>Recent Posts</motion.h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}