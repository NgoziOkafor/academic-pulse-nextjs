import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SchoolList from '../components/SchoolList';
import { auth } from '../util/auth';

export default function Home(props) {
  console.log(props);
  return (
    <>
      <Header output={props.props} />
      <Hero />
      <SchoolList output={props.props} />
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
