import { useEnvVars } from "@/utils/useEnVars.util";
import { useRestClientUtil } from "@/utils/useRestClient.util";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { useFavoriteService } from "@/features/user/services/userFavorite.service";
import { useUserListService } from "@/features/user/services/userList.service";
import { useUserDetailStore } from "@/features/user/stores/userDetail.store";
import { useUserListStore } from "@/features/user/stores/userList.store";


export default function App({ Component, pageProps }: AppProps) {

  const restClientUtil = useRestClientUtil()

  const userListService = useUserListService({ restClientUtil })
  const userFavoriteService = useFavoriteService({restClientUtil})

  const userListStore = useUserListStore({userListService, userFavoriteService})
  const userDetailStore = useUserDetailStore({userFavoriteService})
  
  const customProps = {
    userListStore,
    userDetailStore
  }

  return (
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <Component {...pageProps} {...customProps}/>
    </ThemeProvider>
  )
}
