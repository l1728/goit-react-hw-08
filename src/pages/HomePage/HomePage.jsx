import style from './HomePage.module.css';

const HomePage = () => {
  return (
    <>
      <div className={style.container}>
        <h1 className={style.title}>
          Phonebook manager welcome page{' '}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
};

export default HomePage;
