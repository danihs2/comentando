"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../providers/GlobalContext";
import ModalOverPage from "./ModalOverPage";

function CommentCard(comment) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState('');
    const { loggedIn, setGlobalLoggedIn } = useGlobalContext();
    const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    let cookieValue = document.cookie;
    cookieValue = document.cookie.split('; ').find(row => row.startsWith('username='))?.split('=')[1];
    if (cookieValue) {
        setUsername(cookieValue);
        setGlobalLoggedIn(true);
    }

    //console.log("CookieValue Coment Card: ", cookieValue, loggedIn, username, comment.nombre);
    }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    // Lógica para editar el comentario
    console.log("Editar comentario:", comment.id);
    setIsEditing(isEditing => !isEditing);
  };

  const handleDelete = async () => {
    // Lógica para eliminar el comentario
    console.log("Eliminar comentario:", comment.id);
    // Mostrar un mensaje de confirmación
    if (confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
        let cookieValue = document.cookie;
        cookieValue = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        let response = await fetch(`${process.env.NEXT_PUBLIC_OUR_API_URL}/api/comentario/${comment.id}/eliminar/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Token ${cookieValue}`,
            },
        });
        //console.log(cookieValue);
        response = await response.json();
        //console.log(response);
        if (response.mensaje === "Comentario eliminado exitosamente") {
            window.alert(response.mensaje);
            window.location.reload();
        } else {
            console.error(response);
            window.alert("Error al eliminar el comentario: " + response.detail);
        }
    }
  };

  const handleReport = () => {
    // Lógica para reportar el comentario
    console.log("Reportar comentario:", comment.id);
  };

  return (
    <>
        <article className="p-6 text-base bg-white rounded-tl-lg rounded-tr-lg rounded-bl-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"/>{comment.nombre}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><time dateTime="2022-02-08"
                            title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>
                {
                    loggedIn && username === comment.nombre && (
                        <div className="relative">
                        <button onClick={toggleMenu} id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                            </svg>
                            <span className="sr-only">Comment settings</span>
                        </button>
                        {menuOpen && (
                            <div id="dropdownComment1"
                                className="absolute z-10 right-0 mt-2 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <button onClick={handleEdit} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</button>
                                    </li>
                                    <li>
                                        <button onClick={handleDelete} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</button>
                                    </li>
                                    <li>
                                        <button onClick={handleReport} className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    )
                }
            </footer>
            <p className="text-gray-500 dark:text-gray-400">{comment.comentario}</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                    </svg>
                    {comment.score}
                </button>
            </div>
        </article>
        {isEditing && (
            <ModalOverPage
                pelicula_tmdb_id = { comment.pelicula_tmdb_id }
                esActualizacion={true}
                comentario={comment}
            >
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={handleEdit} >Cancelar</button>
            </ModalOverPage>
        )
        }
    </>
  );
}

export default CommentCard;
