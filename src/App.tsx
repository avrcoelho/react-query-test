import React, { useState, useCallback, FormEvent } from 'react';

import { useFetchPaginated } from './hooks/useFetch'
import { useMutatePost } from './hooks/useMutationPost'
import { IProduct } from './types/product'

import { Container } from './styles/App'

function App() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [slug, setSlug] = useState('');

  const {
    isLoading,
    isError,
    error,
    data,
  } = useFetchPaginated<IProduct[]>('products');
  const [mutate] = useMutatePost('products');

  const handlaAddNewProduct = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const product = {
      title,
      price: Number(price),
      category_id: categoryId,
      slug,
    }

    try {
      await mutate({ url: 'products', product })

      
    } catch (error) {
      console.error(error);
    }
  }, [title, price, categoryId, slug, mutate])

  return (
    <Container>
            {isLoading ? (
         <div>Loading...</div>
       ) : isError ? (
         <div>Error: {error?.message}</div>
       ) : (
         <div>
           {data?.map(project => (
             <p key={project.id}>{project.title}</p>
           ))}
         </div>
       )}

       <form onSubmit={handlaAddNewProduct}>
        <input name="title" placeholder="title" value={title} onChange={event => setTitle(event.target.value)} />
        <input name="price" placeholder="price" value={price} onChange={event => setPrice(event.target.value)} />
        <input name="category_id" placeholder="Category ID" value={categoryId} onChange={event => setCategoryId(event.target.value)} />
        <input name="slug" placeholder="slug" value={slug} onChange={event => setSlug(event.target.value)} />

        <button type="submit">Send</button>
       </form>
    </Container>
  );
}

export default App;
