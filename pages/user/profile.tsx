import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { auth, relocate } from '../../util/auth';

export default function Profile(props: any) {
  const [firstname, setFirstname] = useState(props.props.user.firstname);
  const [lastname, setLastname] = useState(props.props.user.lastname);
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(modalRef);

  return (
    <>
      <Header output={props.props} />
      <section className={'p-5'}>
        <div className={'row'}>
          <div className={'col-5 offset-2'}>
            <img
              src={'../../images/avatar.jpeg'}
              alt={'user avatar'}
              className={'profile-pic rounded-circle'}
            />
          </div>
          <div className={'col-5'}>
            <h3>
              {firstname} {lastname}
            </h3>
            <p>{props.props.user.email}</p>
            <button
              className={'btn btn-primary'}
              data-bs-toggle={'modal'}
              data-bs-target={'#exampleModal'}
            >
              {'Edit'} <i className={'fa fa-edit'} />
            </button>

            {/* Modal */}
            <div
              className={'modal fade'}
              id={'exampleModal'}
              /* tabIndex={'-1'} */
              role={'dialog'}
              aria-labelledby={'exampleModalLabel'}
              aria-hidden={'true'}
              ref={modalRef}
            >
              <div className={'modal-dialog'} role={'document'}>
                <div className={'modal-content'}>
                  <form
                    onSubmit={async (event) => {
                      event.preventDefault();

                      const updateResponse = await fetch(
                        '/api/update-profile',
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            authorization: props.props.token,
                          },
                          body: JSON.stringify({
                            firstname: firstname,
                            lastname: lastname,
                            id: props.props.user.id,
                          }),
                        },
                      );

                      const updateResponseBody = await updateResponse.json();
                      const newUser = updateResponseBody.user;

                      /* const modal = modalRef.current; */
                      /* setProfile('hide'); */
                      /* const mm = Modal.getInstance(modal);
                      mm.hide();
 */
                      console.log(newUser);
                      /* setUser(newUser); */
                      setFirstname(newUser.firstname);
                      setLastname(newUser.lastname);
                    }}
                  >
                    <div className={'modal-header'}>
                      <h5 className={'modal-title'} id={'exampleModalLabel'}>
                        {'Edit Profile'}
                      </h5>
                      <button
                        type={'button'}
                        className={'close'}
                        data-bs-dismiss={'modal'}
                        aria-label={'Close'}
                      >
                        <span aria-hidden={'true'}>&times;</span>
                      </button>
                    </div>
                    <div className={'modal-body'}>
                      <div className={'form-group'}>
                        <label>{'Firstname'}</label>
                        <input
                          className={'form-control'}
                          name={'firstname'}
                          type={'text'}
                          defaultValue={props.props.user.firstname}
                          value={firstname}
                          onChange={(event) =>
                            setFirstname(event.currentTarget.value)
                          }
                        />
                      </div>

                      <div className={'form-group'}>
                        <label>{'Lastname'}</label>
                        <input
                          className={'form-control'}
                          name={'lastname'}
                          type={'text'}
                          defaultValue={props.props.user.lastname}
                          value={lastname}
                          onChange={(event) =>
                            setLastname(event.currentTarget.value)
                          }
                        />
                      </div>
                    </div>
                    <div className={'modal-footer'}>
                      <button
                        type={'button'}
                        className={'btn btn-danger'}
                        data-bs-dismiss={'modal'}
                      >
                        {'Close'}
                      </button>
                      <button type={'submit'} className={'btn btn-primary'}>
                        {'Save changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
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
      return relocate();
    }
  } else {
    return relocate();
  }
}
