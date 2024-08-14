import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDate } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { deleteUser } from "@/services/userService";

import UserForm from "../forms/UserForm";
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
import TableCard from "../ui/TableCard";

const UsersTable = ({ data, loading }: { data: any; loading: boolean }) => {
  const { user } = useAuth()
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
    mutationKey: ["delete-user"],
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      toast.success("User deleted successfully.")
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
      <TableCard title="Users" description="List of all users">
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
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
                      {item.username}
                    </TableCell>
                    <TableCell className="font-medium">{item.role}</TableCell>
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
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setEditDialog({ open: true, data: item })} disabled={item.role !== "user" && user?.role !== "superadmin"}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => setDeleteDialog({ open: true, data: item.username })} disabled={item.role !== "user" && user?.role !== "superadmin"}>
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

      <UserForm
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

export default UsersTable;
