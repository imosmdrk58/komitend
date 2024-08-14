import { useSearchParams } from 'react-router-dom'

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const TablePagination = ({ totalPages }: { totalPages: number }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Pagination className="flex w-auto mx-0">
      <PaginationContent>
        {Number(searchParams.get("page") || 1) > 1 && (
          <PaginationItem className='cursor-pointer'>
            <PaginationPrevious onClick={() => {
              searchParams.set("page", (Number(searchParams.get("page") || 1) - 1).toString())
              setSearchParams(searchParams)
            }} />
          </PaginationItem>
        )}
        {Number(searchParams.get("page") || 1) < totalPages && (
          <PaginationItem className='cursor-pointer'>
            <PaginationNext onClick={() => {
              searchParams.set("page", (Number(searchParams.get("page") || 1) + 1).toString())
              setSearchParams(searchParams)
            }} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination