import {useState} from "react";

export function useLoaderFetch(request: Function) {
  const [isLoading, setLoading] = useState(false)

  const LoaderFetch = async (body: any | undefined) => {
      setLoading(true)
      const response: Response = await request(body)
      setLoading(false)
      return response
  }

  return {isLoading, LoaderFetch}
}