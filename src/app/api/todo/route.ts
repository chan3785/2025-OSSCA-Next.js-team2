<<<<<<< HEAD
import { getUserTodoList } from "@/lib/read-firebase";
=======
import { getUserTodoList } from "@/lib/backend/read-firebase";
>>>>>>> b0b912f2b17d67dc057464511025a6cb8c0352cf
export async function GET(request:Request) {
    //fetch data from db
    const todolists = getUserTodoList()
    
    return new Response(JSON.stringify(todolists), {
        status:200,
        headers: {'Content-Type': 'application/json' }
    })
}