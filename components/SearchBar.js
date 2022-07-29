import React, { useEffect, useState } from 'react';

export default function SearchBar() {
  const [q, setQ] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const nations = await fetch(`/api/getCountries`, { method: 'GET' });
      const feedback = await nations.json();

      setCountries(feedback.response);
    };

    const cc = getCountries();
  }, []);
  return (
    <form
      className={'d-flex bg-white p-3'}
      id={'hero-form'}
      onSubmit={async (event) => {
        event.preventDefault();

        window.location.replace(`/search?q=${q}&country=${country}`);
      }}
    >
      <input
        className={'form-control me-2'}
        type={'search'}
        name={'q'}
        placeholder={'Search'}
        aria-label={'Search'}
        value={q}
        onChange={(event) => setQ(event.currentTarget.value)}
      />
      <select
        className={'form-control'}
        id={'country-select'}
        onChange={(event) => setCountry(event.currentTarget.value)}
      >
        <option defaultValue value={''}>
          {'Select Country'}
        </option>
        {countries.map((item) => {
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select>
      <button className={'btn btn-outline-primary'} type={'submit'}>
        {'Search'}
      </button>
    </form>
  );
}
