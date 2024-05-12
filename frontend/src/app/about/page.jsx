"use client"
const developers = [
  {
    name: 'Daniel Salas',
    role: 'Frontend & backend Developer',
    image: 'https://avatars.githubusercontent.com/u/142026552?v=4',
    bio: 'Developer with experience in React and Next.js, passionate about creating web applications.',
    instagram: 'https://www.instagram.com/danielhs2/',
    github: 'https://github.com/danihs2'
  },
  {
    name: 'Gustavo Diaz',
    role: 'Backend Developer',
    image: 'https://avatars.githubusercontent.com/u/62187656?v=4',
    bio: 'Developer with experience in Djago, and MySql, passionate about creating APIs.',
    instagram: 'https://github.com/GussX03',
    github: 'https://github.com/GussX03'
  },
  {
    name: 'Daniel Apellido',
    role: 'Project Manager',
    image: 'https://avatars.githubusercontent.com/u/1561955?v=4',
    bio: 'PHP Lover phphtmlapi.',
  },
];

import { useState } from 'react';

export default function About() {
  const [success, setSuccess] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = 'https://github.com/danihs2/comentando.git';

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log('Texto copiado al portapapeles');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 2000);
        })
        .catch(err => {
            console.error('No se pudo copiar el texto: ', err);
        });
};

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mt-8 ">About The Project</h1>
        <div className="flex justify-center">
          <p className="text-sm text-gray-700 dark:text-gray-400 mt-4">
            This is a project created by the developers of the team, it is a web application that allows you to comment on the different sections of the page.
            You can clone the project from the following link:
          </p>
          <div className="grid grid-cols-8 gap-2 w-full ">
            <label htmlFor="npm-install" className="sr-only"></label>
            <input
              id="npm-install"
              type="text"
              className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value="https://github.com/danihs2/comentando.git"
              readOnly
            />
            <button
              onClick={copyToClipboard}
              className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 items-center inline-flex justify-center"
            >
                <span id="default-message" onClick={copyToClipboard} className={success? "hidden":""}>Copy</span>
                <span id="success-message" className={success? "inline-flex items-center" : "hidden"}>
                    <svg className="w-3 h-3 text-white me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                    </svg>
                    Copied!
                </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {developers.map((developer, index) => (
              <div key={developer.name} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img 
                  className="rounded-t-lg"
                  src={developer.image} 
                  alt="" 
                  style={{ maxHeight: '400px', objectFit: 'cover' }} 
                />
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{developer.name}</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{developer.role} - {developer.bio}</p>
                    <div className="flex justify-between items-center">
                        <a href={developer.github}  target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12 0C5.372 0 0 5.372 0 12c0 5.303 3.438 9.8 8.207 11.385.6.11.793-.257.793-.57 0-.28-.01-1.022-.015-2.005-3.34.724-4.042-1.623-4.042-1.623-.546-1.385-1.332-1.754-1.332-1.754-1.089-.743.083-.728.083-.728 1.204.084 1.839 1.236 1.839 1.236 1.07 1.834 2.807 1.305 3.494.998.11-.777.42-1.305.764-1.605-2.675-.305-5.491-1.337-5.491-5.945 0-1.315.47-2.383 1.236-3.223-.123-.304-.536-1.524.117-3.176 0 0 1.007-.322 3.3 1.23a11.528 11.528 0 0 1 3-.396c1.018 0 2.044.135 3 .396 2.292-1.552 3.297-1.23 3.297-1.23.656 1.652.243 2.872.12 3.176.768.84 1.234 1.908 1.234 3.223 0 4.621-2.82 5.635-5.502 5.933.432.372.818 1.104.818 2.222 0 1.604-.015 2.894-.015 3.287 0 .315.187.686.8.568C20.57 21.795 24 17.3 24 12c0-6.628-5.373-12-12-12z" clipRule="evenodd"/>
                            </svg>
                        </a>
                        <a href={developer.linkedin} target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM8 18H5V10h3v8zm-1.5-9c-.828 0-1.5-.677-1.5-1.5S5.672 6 6.5 6s1.5.677 1.5 1.5S7.328 9 6.5 9zM19 18h-3V13.656c0-1.363-.487-2.5-1.732-2.5-.952 0-1.268.716-1.268 1.458V18h-3V10h3v1.633V12.5a3.5 3.5 0 0 1 3.5-3.5c2.071 0 3.5 1.337 3.5 4.5V18z"/>
                            </svg>
                        </a>
                        <a href={developer.instagram} target="_blank" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.485 2 2 6.485 2 12s4.485 10 10 10 10-4.485 10-10S17.515 2 12 2zM9.293 18.293A5.978 5.978 0 0 1 12 17.5a5.978 5.978 0 0 1 2.707.793A5.978 5.978 0 0 1 15.5 12a5.978 5.978 0 0 1-.793-2.707A5.978 5.978 0 0 1 12 9.5a5.978 5.978 0 0 1-2.707-.793A5.978 5.978 0 0 1 8.5 12c0 .82.167 1.603.464 2.293zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5.403-7H6.597c-.36 0-.649.29-.649.649v8.702c0 .36.29.649.649.649h10.806c.36 0 .649-.29.649-.649V7.649c0-.36-.29-.649-.649-.649z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
