"use client";
import { useEffect, useState } from "react";
import MovieImage from "./components/MovieImage";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nPagina, setNPagina] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${nPagina}`);
      const datos = await respuesta.json();
      setMovies(datos.results);
      setLoading(false);
    };

    fetchData();
  }, [nPagina]);

  return (
    <div>
      <h1 className="font-bold text-center mt-5">Home Page</h1>
      <section className="main-container pt-2 px-10 pb-10">
        <div className="locationContainer" id="home">
          <h2 id="home" className="main-title font-semibold"> {loading? <p>Loading...</p> : "Peliculas:"}</h2>
            <div className="box">
            {movies && movies.map((movie) => (
              <MovieImage
                key={movie.id}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                movieId={movie.id}
              />
            ))}
            </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setNPagina(nPagina - 1)}
            disabled={nPagina === 1}
          >
            Anterior
          </button>
          <span className="mx-4">{nPagina}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setNPagina(nPagina + 1)}
          >
            Siguiente
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
