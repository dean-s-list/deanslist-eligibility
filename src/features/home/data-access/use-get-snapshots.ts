import { useQuery } from '@tanstack/react-query'

export function useGetSnapshots(endpoint: string) {
  return useQuery({
    queryKey: ['snapshots', endpoint],
    queryFn: async () => {
      return await fetch(`${endpoint}/snapshots`).then((res) => res.json())
    },
  })
}
