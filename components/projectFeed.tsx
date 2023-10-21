"use client";

import { BackendTech, FrontendTech, ProjectDatabase, ProjectInfrastructure, ProjectTech } from '@prisma/client';
// import { Project } from '@prisma/client';
import React, { useState } from 'react'

interface Project {
  id: string,
  project_Title: string,
  project_tech: ProjectTech[],
  frontend_Tech: FrontendTech[],
  backend_Tech: BackendTech[],
  project_database: ProjectDatabase[],
  project_infrastructure: ProjectInfrastructure[],
  otherInfo: string
}

const ProjectFeed = ({data}:{data:Project[]}) => {
    const [openProjectDetails,setOpenProjectDetails] = useState<Project | null>();
  return (
    <>
    <div className='flex justify-center py-4'>
      <div className='flex flex-wrap gap-4 max-w-[94vw]'>
      {data.map((project: Project)=>(
          <div key={project.id}
           onClick={()=>setOpenProjectDetails(project)}
           className='border-2 border-dark rounded-md p-4 w-full sm:w-[45%] lg:w-[30%] xl:w-[19%] cursor-pointer'>
            <div>
              <div className='text-[12px] text-gray-500'>Title</div>
              <h3 className='font-semibold text-sm'>{project.project_Title}</h3>
            </div>
            <div className='mt-4 text-[12px] flex flex-col gap-1'>
              <h4 className='text-gray-500'>Project.Technologies</h4>
              <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{project.project_tech.map(tech=>`${tech.name}, `)}</div>
            </div>
            <div className='mt-4 text-[12px] flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Frontend</h4>
              <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{project.frontend_Tech.map(fe=>`${fe.name}, `)}</div>
            </div>
            <div className='mt-4 text-[12px] flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Backend</h4>
              <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{project.backend_Tech.map(be=>`${be.name}, `)}</div>
            </div>
            <div className='mt-4 text-[12px] flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Databases</h4>
              <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{project.project_database.length!==0 ? project.project_database.map(db=>`${db.name}, `):'-'}</div>
            </div>
            <div className='mt-4 text-[12px] flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Infrastructure</h4>
              <div className='w-full overflow-hidden whitespace-nowrap text-ellipsis'>{project.project_infrastructure.length!==0 ? project.project_infrastructure.map(infra=>`${infra.name}, `):'-'}</div>
            </div>
          </div>
      ))}
      </div>
    </div>
    {
        openProjectDetails ? 
        (
            <div
             onClick={()=>setOpenProjectDetails(null)}
             className='fixed z-10 top-0 left-0 w-full h-full backdrop-brightness-[0.2] flex justify-end transition duration-200 fade-in overflow-auto'>
                <div 
                onClick={e=>e.stopPropagation()}
           className='border-2 border-dark rounded-l-md p-4 w-[80%] md:w-[45%] max-w-[500px] bg-white fade-in-right overflow-auto'>
            <div>
              <div className='text-md text-gray-500'>Title</div>
              <h3 className='font-semibold text-lg'>{openProjectDetails.project_Title}</h3>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Project.Technologies</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.project_tech.map(tech=>`${tech.name}, `)}</div>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Frontend</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.frontend_Tech.map(fe=>`${fe.name}, `)}</div>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Backend</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.backend_Tech.map(be=>`${be.name}, `)}</div>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Databases</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.project_database.length!==0 ? openProjectDetails.project_database.map(db=>`${db.name}, `):'-'}</div>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Technical_Skillset.Infrastructure</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.project_infrastructure.length!==0 ? openProjectDetails.project_infrastructure.map(infra=>`${infra.name}, `):'-'}</div>
            </div>
            <div className='mt-8 text-sm md:text-md flex flex-col gap-1'>
              <h4 className='text-gray-500'>Other_Information.Availibility</h4>
              <div className='w-full text-md md:text-lg'>{openProjectDetails.otherInfo ? openProjectDetails.otherInfo:'-'}</div>
            </div>
                </div>
            </div>
        )
        :
        null
    }
    </>
  )
}

export default ProjectFeed