import { userDetailFactory } from '@/features/user/factories/user.factory';
import { IUserDetailModel } from '@/features/user/models/userDetail.model';
import { IUserDetailStore } from '@/features/user/stores/userDetail.store';
import { UserDetailModule } from '@/features/user/UserDetail.module';
import { useEnvVars } from '@/utils/useEnVars.util';
import { useRestClientUtil } from '@/utils/useRestClient.util';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import { FC } from 'react';

export const getServerSideProps: GetServerSideProps<{userDetailPreload: IUserDetailModel}> = async (context) => {

  const { params } = context;
  const { id } = params as { id: string };

  const envVarsUtil = useEnvVars()
  const restClientUtil = useRestClientUtil()
  const response = await restClientUtil.get<IUserDetailModel, null>({
    url:`${envVarsUtil.baseApiUrl}/users/${id}`
  })
     
  
  if (response.isError) return {
    props: {
      userDetailPreload: userDetailFactory()
    }
  }

  return {
    props: {
      userDetailPreload: {...response.data, favorite: false}
    }
  }
}

interface IUserDetailPageProps {
  userDetailPreload: IUserDetailModel
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