import { useQuery, useMutation } from 'react-query';

interface Post {
  id: number;
  title: string;
  body: string; 
}

interface Data {
  posts: Post[];
}

function useApi(url: string) {
  const fetchData = async (): Promise<Data> => {
    const res = await fetch(url); 
    return res.json() as Data;  
  };
  
  const { data, isLoading } = useQuery<Data, Error>(['data', url], fetchData);
  
  const fetchMutate = async (body: Post) => {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    return res.json() as Post;  
  };
  
  const { mutate: mutateData, isLoading: isMutating } = useMutation<Post, Error, Post>(fetchMutate);
  
  return { 
    data, 
    isLoading,
    mutateData,
    isMutating
  }
}

const { data, mutateData } = useApi('/posts');

// Tipado correcto
data.posts.forEach((post: Post) => {
  
})