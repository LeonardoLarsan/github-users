import { expect, test } from 'vitest'
import { render, act, RenderResult, fireEvent } from '@testing-library/react'
import { UserDetailModule } from './UserDetail.module'
import { useFavoriteService } from './services/userFavorite.service'
import { useUserDetailStore } from './stores/userDetail.store'
import { useRestClientMock } from '../../utils/useRestClientMock.util'
import { userDetailMock } from './mocks/userDetail.mock'
import { userSearchListMock } from './mocks/userSearch.mock'

const restClientMock = useRestClientMock()
restClientMock.setMockList([
  {
    toMachWithURL: '/api/users',
    toMatchWithMethod: 'PATCH',
    response: null,
    payload: null
  }
])

const Container = () => {

  const userFavoriteService = useFavoriteService({ restClientUtil: restClientMock })
  const userDetailStore = useUserDetailStore({ userFavoriteService })

  return (
    <UserDetailModule 
      userDetailPreload={userDetailMock}
      userDetailStore={userDetailStore}
    />
  )
}



const firstRenderUseCase = async () => {

  const view = await act(async ()=> {
    return render(<Container/>)
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


test('userDetailModule', async () => {
 
  const view = await firstRenderUseCase()
  await setFavoriteUserUseCase(view)

})