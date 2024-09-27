export interface IEnvVars {
    baseApiUrl: string
}

export const useEnvVars = (): IEnvVars => ({
    baseApiUrl: String(process.env.NEXT_PUBLIC_BASE_API_URL)
})
