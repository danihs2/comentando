"use client";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../providers/GlobalContext";
import { comment } from "postcss";
import CommentCard from "../components/CommentCard";

function MyComments() {
    const { loggedIn } = useGlobalContext();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    let moviesTitles = [];
    
    useEffect(() => {
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const fetchComments = async () => {
            try {
                let data = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/comentariosByUsuario/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${cookieValue}`,
                    },
                });
                data = await data.json();
                const movieTitlePromises = data.map(async (comment) => {
                    const movieResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${comment.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`);
                    const movieData = await movieResponse.json();
                    return movieData.title;
                });
                const movieTitles = await Promise.all(movieTitlePromises);
                data.forEach((comment, index) => {
                    comment.movieTittle = movieTitles[index];
                });
                console.log(data);
                setComments(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchComments();
    }, []);
    
    return (
        <div className="m-8">
        <h1 className="font-extrabold">My Comments</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            comments.map((comment) => (
                <div key={comment.id}>
                <h2> Link: <a href={"/detalle?movieId="+comment.tmdb_id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> {comment.movieTittle} </a> </h2>
                <CommentCard
                    key={comment.id}
                    id={comment.id}
                    nombre={comment.nombre_usuario}
                    comentario={comment.contenido}
                    score={comment.score}
                />
                </div>
            )
        ))}
        </div>
    );
}

export default MyComments;