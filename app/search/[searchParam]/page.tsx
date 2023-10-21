import ProjectFeed from '@/components/projectFeed';
import axios from 'axios'
import React from 'react'

const SearchPage = async ({params}:{params:{
    searchParam: string
}}) => {
    const {data} = await axios.get(`${process.env.SITE_URL}/api/search/${params.searchParam}`);
    // console.log(data);
    
  return (
    <ProjectFeed data={data}/>
  )
}

export default SearchPage