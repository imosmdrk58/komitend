import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getUsers } from "@/services/userService";

import { Button } from "@/components/ui/button";
import UserForm from "@/components/admin/forms/UserForm";
import UsersTable from "@/components/admin/table/UsersTable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newuserDialogOpen, setNewuserDialogOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ["users", { role: searchParams.get("role") || undefined, page: Number(searchParams.get("page")) || 1 }],
    queryFn: async () => await getUsers({ role: searchParams.get("role") || undefined, page: Number(searchParams.get("page")) || 1 }),
    retry: false,
  })

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs value={searchParams.get("role") || "all"}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all" className="cursor-default" onClick={() => setSearchParams({})}>
              all
            </TabsTrigger>
            <TabsTrigger value="superadmin" onClick={() => setSearchParams({ role: "superadmin"})} className="cursor-default">
              superadmin
            </TabsTrigger>
            <TabsTrigger value="admin" className="cursor-default" onClick={() => setSearchParams({ role: "admin"})}>
              admin
            </TabsTrigger>
            <TabsTrigger value="user" className="cursor-default" onClick={() => setSearchParams({ role: "user"})}>
              user
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              className="h-8 gap-1"
              onClick={() => setNewuserDialogOpen(true)}
            >
              <FontAwesomeIcon icon={faPlusCircle} className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add User
              </span>
            </Button>
          </div>
        </div>
      </Tabs>
      
      <UsersTable data={data} loading={isPending} />
      <UserForm open={newuserDialogOpen} onClose={() => setNewuserDialogOpen(false)} />
    </main>
  )
}

export default Users