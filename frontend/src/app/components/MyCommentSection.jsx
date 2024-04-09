import { useState } from "react";
import LoginButton from "./LoginButton";
export default function MyCommentSection() {
    const [isLogged, setIsLogged] = useState(false);
    const [estrellas, setEstrellas] = useState(0);
    const [comentario, setComentario] = useState("");
    
    if(!isLogged)
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
                        <h3 className="text-xl font-semibold text-slate-500 mb-2">Estrellas</h3>
                        <div className="flex flex-row">
                            <input type="radio" id="star1" name="estrellas" value="1" />
                            <label htmlFor="star1">1</label>
                            <input type="radio" id="star2" name="estrellas" value="2" />
                            <label htmlFor="star2">2</label>
                            <input type="radio" id="star3" name="estrellas" value="3" />
                            <label htmlFor="star3">3</label>
                            <input type="radio" id="star4" name="estrellas" value="4" />
                            <label htmlFor="star4">4</label>
                            <input type="radio" id="star5" name="estrellas" value="5" />
                            <label htmlFor="star5">5</label>
                        </div>
                        <p className="mt-6 text-lg leading-8 text-gray-100">
                            <textarea className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-black" placeholder="Escribe tu comentario" />
                            <button 
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