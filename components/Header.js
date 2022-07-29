import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Header({ output }) {
  console.log(output);
  const [q, setQ] = useState('');
  return (
    <div>
      <Head>
        <meta charSet={'UTF-8'} />
        <meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1.0'}
        />
        <link
          href={
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
          }
          rel={'stylesheet'}
          integrity={
            'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          }
          crossOrigin={'anonymous'}
        />
        <link
          rel={'stylesheet'}
          href={
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
          }
        />

        <title>{'academic-pulse'}</title>
        <script
          src={
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
          }
          integrity={
            'sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p'
          }
          crossOrigin={'anonymous'}
        />
      </Head>
      <header>
        <nav className={'navbar navbar-expand-lg navbar-light bg-light'}>
          <div className={'container-fluid'}>
            <Link href={'/'}>
              <a className={'navbar-brand'}>
                <img src={'/images/logo.png'} height={'50'} alt={'logo'} />
              </a>
            </Link>

            <button
              className={'navbar-toggler'}
              type={'button'}
              data-bs-toggle={'collapse'}
              data-bs-target={'#navbarSupportedContent'}
              aria-controls={'navbarSupportedContent'}
              aria-expanded={'false'}
              aria-label={'Toggle navigation'}
            >
              <span className={'navbar-toggler-icon'} />
            </button>
            <div
              className={'collapse navbar-collapse'}
              id={'navbarSupportedContent'}
            >
              <ul className={'navbar-nav me-auto mb-2 mb-lg-0'}>
                <li className={'nav-item'}>
                  <Link href={'/'}>
                    <a className={'nav-link'}>{'Home'}</a>
                  </Link>
                </li>
                <li className={'nav-item'}>
                  <Link href={'/'}>
                    <a className={'nav-link'}>{'Schools'}</a>
                  </Link>
                </li>
                <li className={'nav-item'}>
                  <Link href={'/about'}>
                    <a className={'nav-link'}>{'About'}</a>
                  </Link>
                </li>
                {output ? (
                  <li className={'nav-item dropdown'}>
                    <Link href={'/'}>
                      <a
                        className={'nav-link dropdown-toggle'}
                        id={'navbarDropdown'}
                        role={'button'}
                        data-bs-toggle={'dropdown'}
                        aria-expanded={'false'}
                      >
                        <i className={'fa fa-user-circle-o'} /> {'Account'}
                      </a>
                    </Link>

                    <ul
                      className={'dropdown-menu'}
                      aria-labelledby={'navbarDropdown'}
                    >
                      <li>
                        <Link href={'/user/profile'}>
                          <a className={'dropdown-item'}>
                            <i className={'fa fa-user'} /> {'Profile'}
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={'/my-favourites'}>
                          <a className={'dropdown-item'}>
                            <i className={'fa fa-star'} /> {'Favourite'}
                          </a>
                        </Link>
                      </li>

                      <li>
                        <hr className={'dropdown-divider'} />
                      </li>
                      <li>
                        <Link href={'/logout'}>
                          <a className={'dropdown-item'}>
                            <i className={'fa fa-sign-out'} />
                            {'Log out'}
                          </a>
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  ''
                )}

                {!output ? (
                  <>
                    <li className={'nav-item'}>
                      <Link href={'/login'}>
                        <a className={'nav-link btn btn-primary'}>
                          {'Sign in'}
                        </a>
                      </Link>
                    </li>
                    <li className={'nav-item'}>
                      <Link href={'/register'}>
                        <a className={'nav-link btn btn-outline-primary ml-2'}>
                          {'Register'}
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  ''
                )}
              </ul>
              <form className={'d-flex'} action={`/search?q=${q}`}>
                <input
                  name={'q'}
                  className={'form-control me-2'}
                  type={'search'}
                  placeholder={'Search'}
                  aria-label={'Search'}
                  value={q}
                  onChange={(event) => setQ(event.currentTarget.value)}
                />
                <button className={'btn btn-outline-primary'} type={'submit'}>
                  <i className={'fa fa-search'} />
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
