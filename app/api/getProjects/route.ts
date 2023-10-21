import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const projects = await db.project.findMany({
      include:{
        project_tech: true,
        frontend_Tech:true,
        backend_Tech: true,
        project_database:true,
        project_infrastructure: true
      }
    })
    
    return new Response(JSON.stringify(projects))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
