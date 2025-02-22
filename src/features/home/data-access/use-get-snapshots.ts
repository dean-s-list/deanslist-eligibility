import { useQuery } from '@tanstack/react-query'

export function useGetSnapshots(endpoint: string, addresses: string[]) {
  return useQuery({
    queryKey: ['snapshots', endpoint, addresses],
    queryFn: async () => {
      return await fetch(`${endpoint}/snapshots?addresses=${addresses.join(',')}`).then((res) => res.json())
    },
  })
}
