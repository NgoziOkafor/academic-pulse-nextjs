/* import Head from 'next/head'; */
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer>
        <div className={'container'}>
          <div className={'row'}>
            <div className={'col-4'}>
              <img src={'/images/logo.png'} height={'200'} alt={'logo'} />
            </div>
            <div className={'col-4'}>
              <h4 className={'mb-3'}>{'QUICK LINKS'}</h4>
              <p className={'text-light'}>
                <Link href={'/'}>
                  <a className={'quick-links'}>{'Home'}</a>
                </Link>
              </p>
              <p className={'text-light'}>
                <Link href={'/about'}>
                  <a className={'quick-links'}>{'About Us'}</a>
                </Link>
              </p>
              <p className={'text-light'}>
                <Link href={'/login'}>
                  <a className={'quick-links'}>{'Sign In'}</a>
                </Link>
              </p>
              <p className={'text-light'}>
                <Link href={'/my-favourites'}>
                  <a className={'quick-links'}>{'Favourite'}</a>
                </Link>
              </p>
            </div>
            <div className={'col-4'}>
              <h4 className={'mb-3'}>{'ABOUT ACADEMIC PULSE'}</h4>
              <p>
                {
                  ' Not sure where to begin your university search? You made the right choice. In this site, there are tons of Universities to help students search for Universities of their choice. This is a great place to find out about Universities if you are just starting your journey because it caters for students who might not know where to begin their search process'
                }
              </p>
            </div>
          </div>
          <hr />
          <div className={'row'}>
            <div className={'col-9'}>&copy; {'Academic Pulse 2022'}</div>
            <div className={'col-3'}>
              <Link href={'/'}>
                <a className={'navbar-brand'}>
                  <i className={'fa fa-facebook'} />
                </a>
              </Link>
              <Link href={'/'}>
                <a className={'navbar-brand'}>
                  <i className={'fa fa-twitter'} />
                </a>
              </Link>
              <Link href={'/'}>
                <a className={'navbar-brand'}>
                  <i className={'fa fa-instagram '} />
                </a>
              </Link>
              <Link href={'http://linkedin.com/in/ngozi-okafor'}>
                <a className={'navbar-brand'} target={'_blank'}>
                  <i className={'fa fa-linkedin '} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
