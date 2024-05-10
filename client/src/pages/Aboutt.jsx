import React from 'react'

const Aboutt = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
    <div className='max-w-2xl mx-auto p-3 text-center'>
      <div>
        <h1 className='text-3xl font font-semibold text-center my-7'>
          About <span className='bg-gradient-to-r from-yellow-500 via-red-500 to-pink-500 text-transparent bg-clip-text gradient-text  dark:bg-gradient-to-l dark:from-cyan-400  dark:to-yellow-300 dark:text-transparent dark:bg-clip-text'>Tabrej' Blog</span>
        </h1>
        <div className='text-md text-gray-500 flex flex-col gap-6 '>
          <p>
            Welcome to Tabrej's Blog! This blog was created by Tabrej Quadir
            as a personal project to share his thoughts and ideas with the
            world. Tabrej is a passionate developer who loves to write about
            technology, coding, and everything in between.
          </p>

          <p>
            On this blog, you'll find weekly articles and tutorials on topics
            such as web development, software engineering, and programming
            languages. Tabrej is always learning and exploring new
            technologies, so be sure to check back often for new content!
          </p>

          <p>
            We encourage you to leave comments on our posts and engage with
            other readers. You can like other people's comments and reply to
            them as well. We believe that a community of learners can help
            each other grow and improve.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}
  

export default Aboutt