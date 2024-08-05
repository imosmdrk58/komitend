import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

const LoadingTable = () => {
  return (
    <>
        {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell colSpan={99} className="h-20 text-center">
            <Skeleton className="w-full h-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default LoadingTable