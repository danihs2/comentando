import { useEffect } from "react";
import MyCommentSection from "./MyCommentSection";

export default function ModalOverPage( { pelicula_tmdb_id, esActualizacion, comentario, children }) {

    useEffect (() => {
        //console.log("Pelicula_tmdb_id: ", pelicula_tmdb_id, "esActualizacion: ", esActualizacion, "comentario: ", comentario);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, []);

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto items-center bg-gray-700 my-6 mx-auto max-w-3xl rounded-lg">
                <MyCommentSection
                    pelicula_tmdb_id = { pelicula_tmdb_id }
                    esActualizacion={esActualizacion}
                    comentario={comentario}
                />
                <div className="flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}