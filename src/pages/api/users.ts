import type { NextApiRequest, NextApiResponse } from "next";
import { useEnvVars } from "@/utils/useEnVars.util";
import { useRestClientUtil } from "@/utils/useRestClient.util";
import { IUserResumeModel } from "@/features/user/models/userResume.model";
import { TResponse } from "@/utils/response.util";

const envVarsUtil = useEnvVars()
const restClientUtil = useRestClientUtil()

const searchUser = async (searchValue: string): Promise<TResponse<Array<IUserResumeModel>, null>> => {
    const response = await restClientUtil.get<{ total_count: number, incomplete_results: boolean, items: Array<IUserResumeModel> }, null>
    (`${envVarsUtil.baseApiUrl}/search/users?q=${searchValue}`)
    if(response.isError) return {...response, data: null}
    return {...response, data: response.data.items}
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {

  const {
    query: { search },
    method,
  } = req

  if (['GET', 'PATCH'].includes(String(method)) === false) return res.status(405)

  if (method === 'GET') {
    const response = await searchUser(String(search))
    res.status(response.status).json(response.data)
    return  
  }

  if (method === 'PATCH') {
    res.status(200).json(null)
    return
  }

  res.status(500).json(null)

}


export default handler
