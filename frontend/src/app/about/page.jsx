const developers = [
  {
    name: 'Daniel Salas',
    role: 'Frontend Developer',
    image: 'https://via.placeholder.com/150',
    bio: 'Developer with experience in React and Next.js, passionate about creating web applications.',
  },
  {
    name: 'Gustavo Diaz',
    role: 'Backend Developer',
    image: 'https://via.placeholder.com/150',
    bio: 'Developer with experience in Djago, and MySql, passionate about creating APIs.',
  },
  {
    name: 'Daniel Apellido',
    role: 'Backend Developer',
    image: 'https://via.placeholder.com/150',
    bio: 'Developer with experience in PHP, and mySQL, passionate about creating web applications.',
  },
];

export default function About() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mt-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {developers.map((developer, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              <img src={developer.image} alt={developer.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold">{developer.name}</h2>
              <p className="text-gray-500 mb-2">{developer.role}</p>
              <p className="text-sm">{developer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
