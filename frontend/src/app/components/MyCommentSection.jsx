import { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { useGlobalContext } from "../providers/GlobalContext";

export default function MyCommentSection( { pelicula_tmdb_id, esActualizacion, comentario } ) {
    const [radioSeleccionado, setRadioSeleccionado] = useState(null);

    const handleRadioChange = (event) => {
        const valorSeleccionado = parseInt(event.target.value);
        setRadioSeleccionado(valorSeleccionado);
    };

    const handleStarClick = (valor) => {
        setRadioSeleccionado(valor);
    };

    const { loggedIn, setGlobalLoggedIn } = useGlobalContext();

    useEffect(() => {
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (cookieValue) {
            setGlobalLoggedIn(true);
        }else{
            setGlobalLoggedIn(false);
            return;
        }
        if(esActualizacion) {
            // Lógica para obtener el comentario actual
            console.log("Comentario Actual:", comentario, " Comentario: ", comentario.comentario);
            document.querySelector('textarea[name="textActualizacion"]').value = comentario.comentario;
            // Poner el score del comentario actual
            const score = comentario.score;
            const radios = document.querySelectorAll('input[name="scoreActualizacion"]');
            for (let i = 0; i < radios.length; i++) {
                if (parseInt(radios[i].value) === score) {
                    radios[i].checked = true;
                    break;
                }
            }
            setRadioSeleccionado(score);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if(!esActualizacion) {
            const score = document.querySelector('input[name="score"]:checked').value;
            const contenido = document.querySelector('textarea').value;
            console.log("Data a enviar: ", score, contenido, esActualizacion);
            return
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
                    window.alert("Error al crear el comentario: " + data.mensaje);
                }
            }
            catch (error) {
                console.error(error);
            }
        }else{
            try {
                const score = document.querySelector('input[name="scoreActualizacion"]:checked').value;
                const contenido = document.querySelector('textarea[name="textActualizacion"]').value;
                const comentario_id = comentario.id;
                console.log("Data a enviar: ", score, contenido, esActualizacion, comentario_id);
                //return;
                let data = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/comentario/${comentario_id}/editar/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Token ${cookieValue}`,
                    },
                    body: JSON.stringify({ score, contenido, pelicula_tmdb_id }),
                });
                data = await data.json();
                if(data.mensaje === "Comentario editado exitosamente") {
                    window.alert(data.mensaje);
                    window.location.reload();
                }else{
                    window.alert("Error al actualizar el comentario: " + data.mensaje);
                }
            }
            catch (error) {
                console.error(error);
            }
        
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
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">{esActualizacion? "Actualiza tu opinion" : "Deja tu opinion"}</h2>
                        <h3 className="text-xl font-semibold text-slate-500 mb-2">Score</h3>
                        <div className="flex flex-row">
                            <input type="radio" id="star1" className="hidden" name={esActualizacion ? "scoreActualizacion" : "score"} value="1" onChange={handleRadioChange} checked={radioSeleccionado >= 1} />
                            <label htmlFor="star1" className="cursor-pointer text-4xl" style={{ color: radioSeleccionado >= 1 ? 'yellow' : 'black' }} onClick={() => handleStarClick(1)}>&#9733;</label> {/* Estrella */}
                            <input type="radio" id="star2" className="hidden" name={esActualizacion ? "scoreActualizacion" : "score"} value="2" onChange={handleRadioChange} checked={radioSeleccionado >= 2} />
                            <label htmlFor="star2" className="cursor-pointer text-4xl" style={{ color: radioSeleccionado >= 2 ? 'yellow' : 'black' }} onClick={() => handleStarClick(2)}>&#9733;</label> {/* Estrella */}
                            <input type="radio" id="star3" className="hidden" name={esActualizacion ? "scoreActualizacion" : "score"} value="3" onChange={handleRadioChange} checked={radioSeleccionado >= 3} />
                            <label htmlFor="star3" className="cursor-pointer text-4xl" style={{ color: radioSeleccionado >= 3 ? 'yellow' : 'black' }} onClick={() => handleStarClick(3)}>&#9733;</label> {/* Estrella */}
                            <input type="radio" id="star4" className="hidden" name={esActualizacion ? "scoreActualizacion" : "score"} value="4" onChange={handleRadioChange} checked={radioSeleccionado >= 4} />
                            <label htmlFor="star4" className="cursor-pointer text-4xl" style={{ color: radioSeleccionado >= 4 ? 'yellow' : 'black' }} onClick={() => handleStarClick(4)}>&#9733;</label> {/* Estrella */}
                            <input type="radio" id="star5" className="hidden" name={esActualizacion ? "scoreActualizacion" : "score"} value="5" onChange={handleRadioChange} checked={radioSeleccionado >= 5} />
                            <label htmlFor="star5" className="cursor-pointer text-4xl" style={{ color: radioSeleccionado >= 5 ? 'yellow' : 'black' }} onClick={() => handleStarClick(5)}>&#9733;</label> {/* Estrella */}
                        </div>
                        <p className="mt-6 text-lg leading-8 text-gray-100">
                            <textarea className="w-full h-32 border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-5 text-sm text-black" name={esActualizacion? "textActualizacion":""} placeholder="Escribe tu comentario" defaultValue={comentario?.comentario? comentario.comentario : ""} />
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