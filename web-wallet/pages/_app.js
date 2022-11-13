import '../styles/globals.css'
import App from "next/app";
import wrapper from "../redux";
import {SimpleSnackBar} from "../components/simpleSnackBar";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps}>
  </Component>
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default wrapper.withRedux(App);
