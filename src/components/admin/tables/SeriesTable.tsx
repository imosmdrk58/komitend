import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDate } from "@/lib/utils";

import LoadingTable from "../ui/TableLoading";
import ConfirmDialog from "../ui/ConfirmDialog";
import TablePagination from "../ui/TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { deleteSerie } from "@/services/serieService";
import TableCard from "../ui/TableCard";

const SeriesTable = ({ data, loading }: { data: any; loading: boolean }) => {
  const queryClient = useQueryClient()
  
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: 0,
  })

  const deleteMutation = useMutation({
    mutationKey: ["delete-series"],
    mutationFn: deleteSerie,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] })
      toast.success("Series deleted successfully.")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = () => {
    if (deleteDialog.id) {
      deleteMutation.mutate(deleteDialog.id)
    }
  }

  return (
    <>
      <TableCard title="Series" description="List of all series">
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Posted By</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="hidden md:table-cell">Updated at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!loading ? (
              data?.data && data.data.length !== 0 ? (
                data?.data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="font-medium">
                      {item.title}
                    </TableCell>
                    <TableCell className="font-medium">{item.status}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.user.username}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(item.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <FontAwesomeIcon
                              icon={faEllipsisH}
                              className="h-4 w-4"
                            />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="cursor-pointer" asChild>
                            <Link to={`/admin/series/edit/${item.slug}`}>
                                Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setDeleteDialog({ open: true, id: item.id })}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={10}>
                    No Results
                  </TableCell>
                </TableRow>
              )
            ) : (
              <LoadingTable />
            )}
          </TableBody>
        </Table>

        <TablePagination totalPages={data?.totalPages} />
      </TableCard>

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, id: 0 })}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default SeriesTable;
