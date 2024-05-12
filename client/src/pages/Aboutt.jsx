import React from 'react';
import {motion} from "framer-motion"

const Aboutt = () => {

  const headingAinme= {
    hidden:{
      y:-600,
      opacity:.7
    },
    open:{
      y:0,
      opacity:1,
      transition:{
        delay:0.30,
        duration:.30,
        staggerChildren:.70,
        type:"spring",
        damping: 15,
        stiffness: 100 
      }
    }
  }

  
  const childVariants = {
    hidden: { opacity: 0 , y:50, scale:1.5},
    open: { opacity: 1, scale:1, y:0, transition:{duration:.05, type:"spring",
    damping: 12,
    stiffness: 300 } }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='max-w-2xl mx-auto p-3 mb-10 text-center'>
      <motion.div variants={headingAinme} initial="hidden" animate="open">
        <motion.h1 variants={headingAinme} className='text-3xl font font-semibold text-center my-7'>
          About <span className='bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text gradient-text  dark:bg-gradient-to-l dark:from-cyan-400  dark:to-yellow-300 dark:text-transparent dark:bg-clip-text'>Tabrej' Blog</span>
        </motion.h1>
        <motion.div className='text-md text-gray-500 flex flex-col gap-6 '>
          <motion.p variants={childVariants}>
            Welcome to Tabrej's Blog! This blog was created by Tabrej Quadir
            as a personal project to share his thoughts and ideas with the
            world. Tabrej is a passionate developer who loves to write about
            technology, coding, and everything in between.
          </motion.p>

          <motion.p variants={childVariants}>
            On this blog, you'll find weekly articles and tutorials on topics
            such as web development, software engineering, and programming
            languages. Tabrej is always learning and exploring new
            technologies, so be sure to check back often for new content!
          </motion.p>

          <motion.p variants={childVariants}>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help
            each other grow and improve.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  </div>
);
}
  

export default Aboutt