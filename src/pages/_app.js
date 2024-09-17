import  { wrapper } from "@/redux/store";
import "@/styles/globals.css";
import { Container } from "@mui/material";

import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner";
import PlainLayout from "@/layout/plainLayout";

 export default function App({ Component,pageProps ,session}) {
  const {store} = wrapper.useWrappedStore(pageProps);
  return(
    <>
    < SessionProvider session={session}>
    <Provider store={store}>
   <PlainLayout>
    <Container>
  <Component {...pageProps} />
  </Container>
  <Toaster position="top-center" richColors />
  </PlainLayout>
  </Provider>
  </SessionProvider>
  </>
  )
}
