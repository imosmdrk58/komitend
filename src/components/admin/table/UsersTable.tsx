import Card from "../Card";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingTable from "./LoadingTable";
import TablePagination from "./TablePagination";
import UserForm from "../forms/UserForm";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteUser(username: string) {
  const res = await fetch(`http://localhost:3001/users/${username}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message);
  }

  const { data } = await res.json();
  return data;
}

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
      <Card title="Users" description="List of all users">
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
      </Card>

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
