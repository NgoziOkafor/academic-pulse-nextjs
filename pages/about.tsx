import Footer from '../components/Footer';
import Header from '../components/Header';
import { auth } from '../util/auth';

export default function search(props: any) {
  return (
    <>
      <Header output={props.props} />

      <section className={'py-5'}>
        <div className={'container'}>
          <h3 className={'text-center'}>{'About Academic Pulse'}</h3>
          <hr />
          <div className={'row'}>
            <div className={'col-12'}>
              <p>
                {
                  'We are the College Team. We believe the path to university should come with directions.'
                }
              </p>
              <p>
                {
                  'We have launched Academic Pulse which is a unique online site. Academic Pulse was created to expand access to higher education. It connects students to university success and opportunity. This website provides list of universities all over the world. It gives you opportunity to search for any university. Whether you are a student, parent or interested in learning more about university access, we can be of great help to you. When you do a search in our website, you can be taken to your selected school website '
                }
              </p>
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
