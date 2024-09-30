import { userDetailFactory } from '@/features/user/factories/user.factory';
import { IUserDetailModel } from '@/features/user/models/userDetail.model';
import { IUserDetailStore } from '@/features/user/stores/userDetail.store';
import { UserDetailModule } from '@/features/user/UserDetail.module';
import { TResponse } from '@/utils/response.util';
import { useEnvVars } from '@/utils/useEnVars.util';
import { useRestClientUtil } from '@/utils/useRestClient.util';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import { FC } from 'react';


export const getServerSideProps: GetServerSideProps<{userDetailPreload: TResponse<IUserDetailModel, null>}> = async (context) => {

  const { params } = context;
  const { id } = params as { id: string };

  const envVarsUtil = useEnvVars()
  const restClientUtil = useRestClientUtil()
  const response = await restClientUtil.get<IUserDetailModel, null>({
    url:`${envVarsUtil.baseApiUrl}/users/${id}`
  })
     
  if(response.isSuccess) return {
    props: {
      userDetailPreload: {...response, data: {...response.data, favorite: false}}
    }
  }

  return {
    props: {
      userDetailPreload: {...response}
    }
  }
}

interface IUserDetailPageProps {
  userDetailPreload: TResponse<IUserDetailModel, null>
  userDetailStore: IUserDetailStore
}

const UserDetailPage: FC<IUserDetailPageProps> = props => {
  return (
    <>
      <Head>
        <title>User Detail</title>
        <meta name="description" content="User Detail" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserDetailModule userDetailStore={props.userDetailStore} userDetailPreload={props.userDetailPreload}/>
    </>
  );
}

export default UserDetailPage;