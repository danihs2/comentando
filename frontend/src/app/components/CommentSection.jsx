import CommentCard from "./CommentCard";
import ReplieCard from "./ReplieCard";
const comments = [
    {
        id: 1,
        id_pelicula: 1,
        id_usuario: 1,
        nombre: "Hugo",
        comentario: "Genial pelicula!",
        replies: [
            {
                id: 1,
                id_comentario: 1,
                id_usuario: 2,
                nombre: "Maria",
                comentario: "Totalmente de acuerdo! ☺️"
            },
            {
                id: 2,
                id_comentario: 1,
                id_usuario: 3,
                nombre: "Pedro",
                comentario: "No me gusto mucho"
            }
        ]
    },
    {
        id: 2,
        id_pelicula: 1,
        id_usuario: 2,
        nombre: "Maria",
        comentario: "Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit",
        replies: []
    }
];

function CommentSection(id_pelicula) {
  return (
    <div>
      <h2 className="font-bold text-center mt-5 mb-4">Comentarios</h2>
      {comments.map((comment) => (
      <div className=" mb-3">
        <CommentCard
          key={comment.id}
          nombre={comment.nombre}
          comentario={comment.comentario}
        />
        {comment.replies.map((reply) => (
          <ReplieCard
            key={reply.id}
            nombre={reply.nombre}
            comentario={reply.comentario}
            reply
          />
        ))}
      </div>
      ))}
    </div>
  );
}

export default CommentSection;