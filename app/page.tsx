import ProjectFeed from '@/components/projectFeed';
import { Project } from '@prisma/client';
import axios from 'axios'
import React from 'react'

const page = async() => {
  const {data} = await axios.get(`${process.env.SITE_URL}/api/getProjects`);
  
  return (
    <>
    {/* <h1>hello</h1> */}
      <ProjectFeed data={data}/>
    </>
  )
}

export default page