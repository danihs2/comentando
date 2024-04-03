import Link from 'next/link';

function MovieImage({ imageUrl, movieId }) {
  return (
    <Link href={`/detalle?movieId=${movieId}`}>
      <img src={imageUrl} alt="Movie Image" />
    </Link>
  );
}

export default MovieImage;