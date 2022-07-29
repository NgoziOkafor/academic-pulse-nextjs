import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { auth } from '../util/auth';

export default function Login(props: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  useEffect(() => {
    setError([]);
  }, []);
  return (
    <div>
      <Header output={props.props} />
      <section>
        <div className={'container'}>
          <div className={'row'}>
            <div className={'col-12'}>
              <h3 className={'text-center'}>{'Login'}</h3>
            </div>
            <div className={'col-12 col-md-6 offset-md-3 px-5 py-5'}>
              {error.length > 0 ? (
                <div
                  className={'alert alert-danger alert-dismissible fade show'}
                  role={'alert'}
                >
                  <strong>{'Alert!'}</strong>{' '}
                  {error.map((item: any) => {
                    return (
                      <div key={item.id}>
                        <p>{item.message}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ''
              )}
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  const loginResponse = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      password: password,
                    }),
                  });

                  const loginResponseBody = await loginResponse.json();
                  console.log(loginResponseBody);
                  if (loginResponseBody.status === 'success') {
                    window.location.replace('/');
                  }

                  setError(loginResponseBody.error);
                }}
              >
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'email'}
                    placeholder={'Email'}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </div>

                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'password'}
                    placeholder={'Password'}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </div>

                <button className={'btn btn-primary'}>{'Login'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export async function getServerSideProps(context: any) {
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
