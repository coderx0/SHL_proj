import { db } from '@/lib/db'

export async function GET(req: Request, {params}:{params: {
    searchParam: string,
}}) {
  try {
    const projectDetails = await db.project.findMany({
        where:{
            project_Title: {
                startsWith: params.searchParam
            }
        },
        include:{
          project_tech: true,
          frontend_Tech: true,
          backend_Tech: true,
          project_database: true,
          project_infrastructure: true
        }
    })
    
    return new Response(JSON.stringify(projectDetails))
  } catch (error) {
    return new Response('Could not fetch project', { status: 500 })
  }
}
