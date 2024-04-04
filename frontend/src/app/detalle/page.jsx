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
        <div className="relative z-1 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">{movieData.title}</h1>
              <h2 className="text-base font-semibold leading-7 text-indigo-600">{movieData.tagline}</h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-row space-x-8 pt-2 px-10 pb-10">
        <div className="flex-1">
          
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Información de la película</h3>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <span className="font-semibold">Título:</span>
              <span>{movieData.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Título Original:</span>
              <span>{movieData.original_title}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Fecha de Lanzamiento:</span>
              <span>{movieData.release_date}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Géneros:</span>
              <div className="flex flex-wrap">
                {movieData.genres && movieData.genres.map(genre => (
                  <span key={genre.id} className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm mr-2 mb-2">{genre.name}</span>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Compañías Productoras:</span>
              <div className="flex flex-wrap">
                {movieData.production_companies && movieData.production_companies.map(company => (
                  <span key={company.id} className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 text-sm mr-2 mb-2">{company.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default detallep;