"use client";
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CommentSection from '../components/CommentSection';

 
const detallep = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [movieData, setMovieData] = useState({})

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    // expected output: "/detalle?movieId=1"
    var movieId = searchParams.get('movieId')
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.img = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
      setMovieData(data)
    });
  }, [pathname, searchParams])
  return (
    <>
      <section className="relative mt-5 flex items-center justify-center h-screen">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-50"
          src={movieData.img}
          alt="Movie background"
        />
        <div className="relative z-10 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{movieData.title}</h1>
              <h2 class="text-base font-semibold leading-7 text-indigo-600">{movieData.tagline}</h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='main-container pt-2 px-10 pb-10'>
        <CommentSection id_pelicula={movieData.id} />
      </section>
    </>
  );
}

export default detallep;