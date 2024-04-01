import Link from 'next/link';

function MovieImage({ imageUrl, movieId }) {
  return (
    <Link href={`/detalle/${movieId}`}>
      <img src={imageUrl} alt="" />
    </Link>
  );
}

export default MovieImage;