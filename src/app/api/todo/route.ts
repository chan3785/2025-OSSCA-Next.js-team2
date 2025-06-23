import { getUserTodoList } from "@/lib/backend/read-firebase";
export async function GET(request:Request) {
    //fetch data from db
    const todolists = getUserTodoList()
    
    return new Response(JSON.stringify(todolists), {
        status:200,
        headers: {'Content-Type': 'application/json' }
    })
}