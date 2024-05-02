import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "@/api/dashboard";
import { useState } from "react";
import { createBoardSchema, type typeCreateBoardSchema } from "@repo/common";
import { toast } from "sonner"


const CreateBoard = () => {
  
  const { organization } = useOrganization();
  const { getToken } = useAuth();
  const {user} = useUser()

  const [boardTitle, setBoardTitle] = useState<string>("");

  const queryClient = useQueryClient()

  const { mutate, data, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (boardTitle: string) => {
      const token = await getToken();
      if (!token) throw new Error("No token!");
      if (!organization) throw new Error("No organization selected!");  // All this errors are handled in onError callback function

      const reqData: typeCreateBoardSchema = {
        userName: user?.username as string,
        title: boardTitle,
        orgId: organization?.id!,
      };

      const validate = createBoardSchema.safeParse(reqData);
      if (!validate.success) {
        // TODO Display Error in UI
        throw new Error(validate.error.format().title?._errors[0] as string); // TODO Display errors for all fields
      }
      return createBoard(token, reqData);   // createBoard returns the response object of http response and it will be available as data returned from useMutation
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["boards",organization?.id]  // Whenever new board is added old cache will be invalid and fetch occurs
      })
      console.log(data?.data); 
      toast.success("Board created successfully!")
    },
    onError: (error) => {
      console.log(error.message); 
      toast.error(error.message)
    },
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl">Create new board</DialogTitle>
        <DialogDescription className="text-lg">
          Provide board title
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right text-lg">
            Title
          </Label>
          <Input
            id="name"
            defaultValue="Board-1"
            className="col-span-3"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          disabled={isPending}
          onClick={() => mutate(boardTitle)}
        >
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateBoard;
