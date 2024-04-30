import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { useGlobalContext } from "../providers/GlobalContext";

export default function MyCommentSection( { pelicula_tmdb_id } ) {
    const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

    useEffect(() => {
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (cookieValue) {
            setGlobalLoggedIn(true);
        }else{
            setGlobalLoggedIn(false);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        const score = document.querySelector('input[name="score"]:checked').value;
        const contenido = document.querySelector('textarea').value;
        console.log("Data a enviar: ", score, contenido);
        if(score === 0 || contenido === "") {
            window.alert("Por favor selecciona un numero de score y escribe un contenido");
            return;
        }
        try {
            let data = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/pelicula/${pelicula_tmdb_id}/comentario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Token ${cookieValue}`,
                },
                body: JSON.stringify({ score, contenido, pelicula_tmdb_id }),
            });
            data = await data.json();
            if(data.mensaje === "Comentario creado exitosamente") {
                window.alert(data.mensaje);
                window.location.reload();
            }else{
                window.alert("Error al crear el comentario");
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    
    if(!loggedIn)
    return (
        <>
        <section className="relative bg-gray-800 bg-opacity-60 h-96 rounded-lg">
            <div className="relative z-1 py-24 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white">Has una cuenta para comentar</h1>
                <h2 className="text-base font-semibold leading-7 text-indigo-600">Es rapido :D</h2>
                <p className="mt-6 text-lg leading-8 text-gray-100">
                    <LoginButton/>
                </p>
                </div>
            </div>
            </div>
        </section>
        </>
    );
    else return (
        <>
        <section className="relative bg-gray-800 bg-opacity-60 rounded-lg">
            <div className="relative z-1">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Comentarios</h1>
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Deja tu opinion</h2>
                        <h3 className="text-xl font-semibold text-slate-500 mb-2">score</h3>
                        <div className="flex flex-row">
                            <input type="radio" id="star1" name="score" value="1" />
                            <label htmlFor="star1">1</label>
                            <input type="radio" id="star2" name="score" value="2" />
                            <label htmlFor="star2">2</label>
                            <input type="radio" id="star3" name="score" value="3" />
                            <label htmlFor="star3">3</label>
                            <input type="radio" id="star4" name="score" value="4" />
                            <label htmlFor="star4">4</label>
                            <input type="radio" id="star5" name="score" value="5" />
                            <label htmlFor="star5">5</label>
                        </div>
                        <p className="mt-6 text-lg leading-8 text-gray-100">
                            <textarea className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-black" placeholder="Escribe tu comentario" />
                            <button onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
                                >
                                Enviar
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}