import SearchBar from './SearchBar';

export default function Hero() {
  return (
    <section
      className={'hero-section'}
      style={{ backgroundImage: 'url(images/hero-bg-3.jpg)' }}
    >
      <div id={'overlay'} />
      <div className={'hero-content'}>
        <div className={'container mt-5'}>
          <div className={'row'}>
            <div className={'col-12 text-center py-5'}>
              <h2 className={'text-capitalize mt-5'}>
                {'Start Your Academic Journey'}
              </h2>
              <h1 className={'text-uppercase'}>{'Search For Universities'}</h1>
            </div>
          </div>
          <div className={'row'}>
            <div className={'col-12'}>
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
