import React from 'react';
import { motion } from 'framer-motion';
import CallToAction from "../components/CallToAction";

const Projects = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5, // Adjust the stagger delay as needed
      }
    }
  };

  const headingVar = {
    hidden: {
      opacity: 0,
      y: -150 // Adjust to move the h1 from the top
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  const left ={
    hidden: {
      opacity: 0,
      scale:2.5
    },
    visible: {
      opacity: 1,
      scale:1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  const right ={
    hidden: {
      opacity: 0,
      scale:0.5,
    },
    visible: {
      opacity: 1,
      scale:1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'
    >
      <motion.h1 
        className='text-3xl font-semibold'
        variants={headingVar}
      >
        Projects
      </motion.h1>
      <motion.p 
        className='text-md text-gray-500'
        variants={left}
      >
        Build fun and engaging projects while learning
        <span className='ml-1 font-bold bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text gradient-text dark:bg-gradient-to-l dark:from-cyan-400  dark:to-yellow-300 dark:text-transparent dark:bg-clip-text'>
          HTML, CSS, and JavaScript!
        </span>
      </motion.p>
      <motion.div
        variants={right}
      >
        <CallToAction />
      </motion.div>
    </motion.div>
  );
};

export default Projects;