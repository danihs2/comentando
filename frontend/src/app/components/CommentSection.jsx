import CommentCard from "./CommentCard";
const comments = [
    {
        id: 1,
        id_pelicula: 1,
        id_usuario: 1,
        nombre: "Hugo",
        comentario: "Genial pelicula!"
    },
    {
        id: 2,
        id_pelicula: 1,
        id_usuario: 2,
        nombre: "Maria",
        comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit"
    }
];

function CommentSection(id_pelicula) {
  return (
    <div>
      <h2 className="font-bold text-center mt-5 mb-4">Comentarios</h2>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          nombre={comment.nombre}
          comentario={comment.comentario}
        />
      ))}
    </div>
  );
}

export default CommentSection;