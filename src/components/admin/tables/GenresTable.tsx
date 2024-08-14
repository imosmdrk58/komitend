import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDate } from "@/lib/utils";

import TableLoading from "../ui/TableLoading";
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
import GenreForm from "../forms/GenreForm";
import { deleteGenre } from "@/services/genreService";
import TableCard from "../ui/TableCard";

const GenresTable = ({ data, loading }: { data: any; loading: boolean }) => {
  const queryClient = useQueryClient()
  
  const [editDialog, setEditDialog] = useState({
    open: false,
    data: null,
  })
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    data: null,
  })

  const deleteMutation = useMutation({
    mutationKey: ["delete-genre"],
    mutationFn: deleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] })
      toast.success("Genre deleted successfully.")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = () => {
    if (deleteDialog.data) {
      deleteMutation.mutate(deleteDialog.data)
    }
  }

  return (
    <>
      <TableCard title="Genres" description="List of all genres">
        <Table className="mb-4">

          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
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
                      {item.name}
                    </TableCell>
                    <TableCell className="font-medium">{item.slug}</TableCell>
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
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setEditDialog({ open: true, data: item })}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setDeleteDialog({ open: true, data: item.id })}>
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
              <TableLoading />
            )}
          </TableBody>
          
        </Table>

        <TablePagination totalPages={data?.totalPages} />
      </TableCard>

      <GenreForm
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, data: null })}
        data={editDialog.data}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, data: null })}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default GenresTable;
