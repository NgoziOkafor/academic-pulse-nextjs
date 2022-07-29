import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/BreadCrumb';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { auth } from '../util/auth';
import { schoolPhotos } from '../util/schoolDb';

export default function Search(props) {
  const query = useRouter();
  const [favourites, setFavourites] = useState([]);

  const [list, setList] = useState([]);

  let count = 1;
  useEffect(() => {
    if (!query.isReady) return;

    const getSchool = async () => {
      const schools = await fetch(`/api/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: query.query.q,
          country: query.query.country,
        }),
      });
      const feedback = await schools.json();
      console.log(feedback);
      setList(feedback);
    };

    const result = getSchool();
    console.log(result);
  }, [query.isReady]);

  useEffect(() => {
    /* const qString = query.q; */

    const getFavourites = async () => {
      const get_favourites = await fetch(`/api/getFavourite`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          user_id: props.hasOwnProperty('props') ? props.props.user.id : 0,
        },
      });
      const resp = await get_favourites.json();
      console.log(resp);
      setFavourites(resp);
    };

    const output = getFavourites();
    console.log(output);
  }, []);

  async function addToFavourite(id) {
    const add = await fetch(`/api/add-favourite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id: id,
        user_id: props.props.user.id,
      }),
    });
    const feedback = await add.json();
    setFavourites(feedback.favourite);

    console.log(favourites);
    /* setFavourite(feedback); */
  }

  async function removeFromFavourite(id) {
    const add = await fetch(`/api/remove-favourite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        school_id: id,
        user_id: props.props.user.id,
      }),
    });
    const feedback = await add.json();
    setFavourites(feedback.favourite);
  }

  const data = {
    list_count: list.length.toString(),
  };

  return (
    <>
      <Header output={props.props} />
      <Breadcrumb data={data} />
      <section className={'py-5'}>
        <div className={'container'}>
          <h3 className={'text-center'}>{'Results for ' + query.query.q}</h3>
          <hr />
          <div className={'row'}>
            {query.isReady
              ? list.map((item) => {
                  if (count === schoolPhotos.length) {
                    count = 1;
                  } else {
                    count++;
                  }

                  return (
                    <div
                      key={item.id}
                      className={
                        'col-md-4 col-lg-3 col-sm-6 col-8 offset-2 offset-sm-0 mb-3'
                      }
                    >
                      <div className={'card w-100'}>
                        <div
                          className={'card-img'}
                          style={{
                            backgroundImage: `url(/images/${
                              schoolPhotos[count - 1].image
                            })`,
                            backgroundSize: `cover`,
                            backgroundPosition: `center`,
                          }}
                        >
                          <div className={'card-overlay'} />
                          <div className={'name'} />
                        </div>
                        <div className={'card-body'}>
                          <h5 className={'card-title text-center'}>
                            {item.name}
                          </h5>

                          <Link href={'http://' + item.website}>
                            <a className={'btn btn-primary'} target={'_blank'}>
                              {'View'} <i className={'fa fa-globe'} />
                            </a>
                          </Link>
                          {props.hasOwnProperty('props') ? (
                            favourites.includes(item.id) ? (
                              <button
                                className={'btn btn-outline-danger'}
                                onClick={(event) =>
                                  removeFromFavourite(item.id)
                                }
                              >
                                {'Remove'}
                              </button>
                            ) : (
                              <button
                                className={'btn btn-outline-primary'}
                                onClick={(event) => addToFavourite(item.id)}
                              >
                                {'Add Favourite'}
                              </button>
                            )
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              : ''}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
export async function getServerSideProps(context) {
  const token = await context.req.cookies.sessionToken;
  if (token) {
    const session = auth(token);
    if (session) {
      return {
        props: session,
      };
    } else {
      return {
        props: {},
      };
    }
  } else {
    return {
      props: {},
    };
  }
}
