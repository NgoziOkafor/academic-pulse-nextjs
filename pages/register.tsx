import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { auth } from '../util/auth';

export default function Register(props: any) {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
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
              <h3 className={'text-center'}>{'User Registration'}</h3>
            </div>
            <div className={'col-12 col-md-6 offset-md-3 px-5 py-5'}>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  const registerResponse = await fetch('/api/register', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email,
                      firstname: firstname,
                      lastname: lastname,
                      password: password,
                      cpassword: cpassword,
                    }),
                  });

                  const registerResponseBody = await registerResponse.json();

                  if (registerResponseBody.error.length < 1) {
                    if (registerResponseBody.hasOwnProperty('status')) {
                      if (registerResponseBody.status === 'success') {
                        window.location.replace('/');
                      }
                    }
                  } else {
                    setError(registerResponseBody.error);
                  }
                }}
              >
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    name={'email'}
                    type={'email'}
                    placeholder={'Email'}
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                  />
                </div>
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'text'}
                    name={'firstname'}
                    placeholder={'First Name'}
                    value={firstname}
                    onChange={(event) =>
                      setFirstname(event.currentTarget.value)
                    }
                  />
                </div>
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'text'}
                    name={'lastname'}
                    placeholder={'Last Name'}
                    value={lastname}
                    onChange={(event) => setLastname(event.currentTarget.value)}
                  />
                </div>
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'password'}
                    name={'password'}
                    placeholder={'Password'}
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                </div>
                <div className={'form-group mb-3'}>
                  <input
                    className={'form-control'}
                    type={'password'}
                    name={'c_password'}
                    placeholder={'Confirm Password'}
                    value={cpassword}
                    onChange={(event) =>
                      setCpassword(event.currentTarget.value)
                    }
                  />
                </div>
                <button className={'btn btn-primary'}>{'Register'}</button>
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
