import { expect, test } from 'vitest'
import { render, act, RenderResult, fireEvent } from '@testing-library/react'
import { userListMock } from './mocks/userListMock.mock'
import UserListModule from './UserList.module'
import { IRestClientMock, useRestClientMock } from '../../utils/useRestClientMock.util'
import { useUserListStore } from './stores/userList.store'
import { useFavoriteService } from './services/userFavorite.service'
import { useUserListService } from './services/userList.service'
import { userSearchListMock } from './mocks/userSearch.mock'
import { createResponseUtil, TResponse } from '../../utils/response.util'
import { IUserResumeModel } from './models/userResume.model'

const Container = (props: {
  restClientMock: IRestClientMock
  preloadUserList: TResponse<IUserResumeModel[], null>
}) => {

  const userFavoriteService = useFavoriteService({ restClientUtil: props.restClientMock })
  const userListService = useUserListService({ restClientUtil: props.restClientMock })

  const userListStore = useUserListStore({
    userFavoriteService,
    userListService
  })

  return (
    <UserListModule
      userListStore={userListStore}
      preloadUserList={props.preloadUserList}
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
    },
    {
      toMachWithURL: '/api/users?search=mojombo',
      toMatchWithMethod: 'GET',
      response: userSearchListMock,
      payload: null
    }
  ])

  const view = await act(async () => {
    return render(<Container preloadUserList={createResponseUtil.success(userListMock, 200)} restClientMock={restClientMock} />)
  })

  expect(view.container).toMatchSnapshot('firstRenderUseCase-1')

  return view
}

const setFavoriteUserUseCase = async (view: RenderResult) => {

  await act(async () => {
    fireEvent.click(view.getByTestId('favoriteButton-1'))
  })

  expect(view.container).toMatchSnapshot('setFavoriteUserUseCase')
}

const searUserUseCase = async (view: RenderResult) => {
  await act(async () => {
    const searchTextFielElement = view.getByLabelText("Busqueda")!!
    fireEvent.change(searchTextFielElement, { target: { value: 'mojombo' } })
    fireEvent.click(view.getByTestId("search-button"))
  })

  expect(view.container).toMatchSnapshot('searUserUseCase')
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

  const view = await act(async () => {
    return render(<Container restClientMock={restClientMock} preloadUserList={createResponseUtil.error(null, 500)}/>)
  })

  expect(view.container).toMatchSnapshot('firstRenderWithErrorUseCase')

  return view
}


test('userListModule', async () => {
  const view = await firstRenderUseCase()
  await setFavoriteUserUseCase(view)
  await searUserUseCase(view)
})

test('userListModule with Error', async () => {
  await firstRenderWithErrorUseCase()
})