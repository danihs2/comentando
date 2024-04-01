import MovieImage from "./components/MovieImage";

function HomePage() {
  return (
    <div>
      <h1 className="font-bold text-center mt-5">Home Page</h1>
      <section className="main-container pt-2 px-10 pb-10">
        <div className="locationContainer" id="home">
          <h2 id="home" className="main-title font-semibold">Popular on Netflix</h2>
            <div className="box">
              <MovieImage imageUrl="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true" movieId="1" />
              <MovieImage imageUrl="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p2.PNG?raw=true" movieId="2" />    
            </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;