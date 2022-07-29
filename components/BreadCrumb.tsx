import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

export default function Breadcrumb(data: any) {
  const [schoolCount, setSchoolCount] = useState(0);
  console.log(data);
  useEffect(() => {
    setSchoolCount(data.data.list_count);
  });

  return (
    <section
      className={'breadcrumb-section'}
      style={{ backgroundImage: 'url(images/hero-bg-3.jpg)' }}
    >
      <div id={'overlay'} />
      <div className={'hero-content'}>
        <div className={'container'}>
          <div className={'row'}>
            <div className={'col-12 text-center py-5'}>
              <h1 className={'text-uppercase'}>
                {'Search Results '}
                <span>
                  {'('}
                  <span id={'school-count'}>{schoolCount}</span>
                  {')'}
                </span>
              </h1>
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
