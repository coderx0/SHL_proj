import ProjectFeed from '@/components/projectFeed';
import axios from 'axios'
import React from 'react'


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


const page = async() => {
  const {data} = await axios.get(`${process.env.SITE_URL}/api/getProjects`);
  
  return (
    <>
      <ProjectFeed data={data}/>
    </>
  )
}

export default page