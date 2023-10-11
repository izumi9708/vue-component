type Data = {
  body:string;
  userId:number;
  title:string;
  id:number;
}

export async function getList():Promise<Data[]> {
  return (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
}
