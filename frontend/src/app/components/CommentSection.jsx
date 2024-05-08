import { useEffect } from "react";
import CommentCard from "./CommentCard";
import ReplieCard from "./ReplieCard";

function CommentSection(props) {

 useEffect(() => {
    //console.log("aa", props.comentarios);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-center mt-5 mb-4">Comentarios</h2>
      { 
      props.comentarios?.map((comment) => (
        <div className=" mb-3" key={"contenedor-"+comment.id}>
          <CommentCard
            key={comment.id}
            id={comment.id}
            nombre={comment.nombre_usuario}
            comentario={comment.contenido}
            score={comment.score}
          />
          {comment.replies?.map((reply) => (
            <ReplieCard
              key={reply.id}
              nombre={reply.nombre}
              comentario={reply.comentario}
              reply
            />
          ))}
        </div>
      ))
      }
      {!props.comentarios && <p>No hay comentarios :(</p>}
    </div>
  );
}

export default CommentSection;