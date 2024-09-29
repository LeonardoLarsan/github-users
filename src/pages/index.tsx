import { GetServerSideProps } from "next";
import { FC } from "react";
import { useEnvVars } from "@/utils/useEnVars.util";
import { useRestClientUtil } from "@/utils/useRestClient.util";
import Head from 'next/head'
import { IUserResumeModel } from "@/features/user/models/userResume.model";
import { IUserListStore } from "@/features/user/stores/userList.store";
import UserListModule from "@/features/user/UserList.module";

export const getServerSideProps: GetServerSideProps<{preloadUserList: Array<IUserResumeModel>}> =  async (context) => {

  const envVarsUtil = useEnvVars()
  const restClientUtil = useRestClientUtil()
  const response = await restClientUtil.get<Array<IUserResumeModel>, null>({url: `${envVarsUtil.baseApiUrl}/users`})
  

  if(response.isError) return {
    props: {
      preloadUserList: []
    }
  }

  return {
      props: {
        preloadUserList: response.data.map(user=>({
          ...user, favorite: false
        }))
      }
  }
}


interface IHomePageProps {
  userListStore: IUserListStore
  preloadUserList: Array<IUserResumeModel>
}

const HomePage: FC<IHomePageProps> = (props) => {


  return (
    <>
      <Head>
        <title>User List</title>
        <meta name="description" content="User List" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <UserListModule
        userListStore={props.userListStore}
        preloadUserList={props.preloadUserList}
      />
    </>
  );
}

export default HomePage