import { expect, test } from 'vitest'
import { render, act, RenderResult, fireEvent } from '@testing-library/react'
import { UserDetailModule } from './UserDetail.module'
import { useFavoriteService } from './services/userFavorite.service'
import { useUserDetailStore } from './stores/userDetail.store'
import { IRestClientMock, useRestClientMock } from '../../utils/useRestClientMock.util'
import { userDetailMock } from './mocks/userDetail.mock'
import { createResponseUtil, TResponse } from '../../utils/response.util'
import { IUserDetailModel } from './models/userDetail.model'



const Container = (props: {
  restClientMock: IRestClientMock
  userDetailPreloadMock: TResponse<IUserDetailModel, null>
}) => {

  const userFavoriteService = useFavoriteService({ restClientUtil: props.restClientMock })
  const userDetailStore = useUserDetailStore({ userFavoriteService })

  return (
    <UserDetailModule 
      userDetailPreload={props.userDetailPreloadMock}
      userDetailStore={userDetailStore}
    />
  )
}

const firstRenderUseCase = async () => {

  const restClientMock = useRestClientMock()
  restClientMock.setMockList([
    {
      toMachWithURL: '/api/users',
      toMatchWithMethod: 'PATCH',
      response: null,
      payload: null
    }
  ])

  const view = await act(async ()=> {
    return render(
      <Container 
        restClientMock={restClientMock} 
        userDetailPreloadMock={createResponseUtil.success(userDetailMock, 200)}
      />)
  })

  expect(view.container).toMatchSnapshot('firstRenderUseCase')

  return view
}

const setFavoriteUserUseCase = async (view: RenderResult) => {

  await act(async () => {
    fireEvent.click(view.getByTestId('favoriteButton'))
  })

  expect(view.container).toMatchSnapshot('setFavoriteUserUseCase')  
}

const firstRenderWithErrorUseCase = async () => {

  const restClientMock = useRestClientMock()
  
  restClientMock.setMockList([
    {
      toMachWithURL: '/api/users',
      toMatchWithMethod: 'PATCH',
      response: null,
      payload: null
    }
  ])

  const view = await act(async ()=> {
    return render(<Container restClientMock={restClientMock} userDetailPreloadMock={createResponseUtil.error(null, 500)}/>)
  })

  expect(view.container).toMatchSnapshot('firstRenderWithErrorUseCase')

  return view
}

test('userDetailModule', async () => {
  const view = await firstRenderUseCase()
  await setFavoriteUserUseCase(view)
})

test('userDetailModule with Error', async () => {
  await firstRenderWithErrorUseCase()
})