"use client";
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import CommentSection from '../components/CommentSection';
import MyCommentSection from '../components/MyCommentSection';

async function getComments(movieId) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/pelicula/${movieId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
 
const detallep = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [movieData, setMovieData] = useState({})
  const [ourMovieData, setOurMovieData] = useState({})
  const [loading, setLoading] = useState(true)
  const [comentarios, setComentarios] = useState(null);
  let movieId = searchParams.get('movieId');

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    // expected output: "/detalle?movieId=1"
    movieId = searchParams.get('movieId')
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
      data.img = `https://image.tmdb.org/t/p/original${data.backdrop_path}`
      setMovieData(data)
    });
    const fetchData = async () => {
      const data = await getComments(movieId);
      setComentarios(data);
      setLoading(false);
    };

    fetchData();
    
  }, [pathname, searchParams])

  return (
    <>
      <section className="relative flex items-center justify-center h-screen">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-50"
          src={movieData.img}
          alt="Movie background"
        />
        <div className="relative z-1 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white">{movieData.title}</h1>
              <h2 className="text-base font-semibold leading-7 text-indigo-600">{movieData.tagline}</h2>
              <p className="mt-6 text-lg leading-8 text-gray-100">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row space-x-8 pt-2 px-10 pb-10">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-slate-500 mb-2">Información de la película</h3>
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
                ))
                }
                
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
        <div className="flex-1">
          <MyCommentSection pelicula_tmdb_id = { movieId } />
        </div>
      </div>
      <div className="px-10 pb-10">
        {loading ? <p>Cargando comentarios...</p> : 
          <>
            <CommentSection comentarios={comentarios.comentarios} />
          </> 
        }
      </div>
    </>
  );
}

export default detallep;