import Router, { useRouter } from "next/router";
import LocalStorage from "../storage/LocalStorage";

const withBeforeAuth = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    // const userAuth = await checkUserAuthentication();
    // Are you an authorized user or not?
    const user = LocalStorage.getUser();
    console.log(user);
    // if (user) {
    Router.replace("/");
    return { user: user };
    // }
    //   if (!userAuth?.auth) {
    //     // Handle server-side and client-side rendering.
    //     if (context.res) {
    //       context.res?.writeHead(302, {
    //         Location: login,
    //       });
    //       context.res?.end();
    //     } else {
    //       Router.replace(login);
    //     }
    //   } else if (WrappedComponent.getInitialProps) {
    //     const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth });
    //     return { ...wrappedProps, userAuth };
    //   }
    //   return { userAuth };
  };

  return hocComponent;
};

export default withBeforeAuth;
