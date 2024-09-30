import { expect, test } from 'vitest'
import { render, act, RenderResult, fireEvent } from '@testing-library/react'
import { userListMock } from './mocks/userListMock.mock'
import UserListModule from './UserList.module'
import { useRestClientMock } from '../../utils/useRestClientMock.util'
import { useUserListStore } from './stores/userList.store'
import { useFavoriteService } from './services/userFavorite.service'
import { useUserListService } from './services/userList.service'
import { userSearchListMock } from './mocks/userSearch.mock'
import { createResponseUtil } from '../../utils/response.util'

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

const Container = () => {

  const userFavoriteService = useFavoriteService({ restClientUtil: restClientMock })
  const userListService = useUserListService({ restClientUtil: restClientMock })

  const userListStore = useUserListStore({
      userFavoriteService,
      userListService
  })

  return (
    <UserListModule 
        userListStore={userListStore}
        preloadUserList={createResponseUtil.success(userListMock, 200)}
    />
  )
}

const firstRenderUseCase = async () => {

  const view = await act(async ()=> {
    return render(<Container/>)
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
    fireEvent.change(searchTextFielElement, {target: {value: 'mojombo'}})
    fireEvent.click(view.getByTestId("search-button"))
  })

  expect(view.container).toMatchSnapshot('searUserUseCase')  
}

test('userListModule', async () => {
  const view = await firstRenderUseCase()
  await setFavoriteUserUseCase(view)
  await searUserUseCase(view)
})