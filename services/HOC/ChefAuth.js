import Router, { useRouter } from "next/router";

const checkUserAuthentication = () => {
  return { auth: true }; // change null to { isAdmin: true } for test it.
};
const login = "/chef/login"; // Define your login route address.

const withChef = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await checkUserAuthentication();

    // Are you an authorized user or not?
    if (!userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth });
      return { ...wrappedProps, userAuth };
    }
    return { userAuth };
  };

  return hocComponent;
};
export default withChef;
