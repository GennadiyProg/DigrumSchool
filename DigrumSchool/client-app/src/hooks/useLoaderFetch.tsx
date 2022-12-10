import {useState} from "react";

export function useLoaderFetch<T extends Array<any>, U>(request: (...args: T) => U) {
  const [isLoading, setLoading] = useState(false)

  async function LoaderFetch(...args: T) {
      setLoading(true)
      const response: Awaited<U> = await request(...args)
      setLoading(false)
      return response
  }

  return {isLoading, LoaderFetch}
}