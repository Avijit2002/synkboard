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
import { useAuth, useOrganization } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { createBoard } from "@/api/dashboard";
import { useState } from "react";
import { createBoardSchema, type typeCreateBoardSchema } from "@repo/common";

const CreateBoard = () => {
  const { organization } = useOrganization();
  const { getToken } = useAuth();

  const [boardTitle, setBoardTitle] = useState<string>("");

  const { mutate, data, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: ({token,data}:{token:string,data:typeCreateBoardSchema}) => {
      return createBoard(token, data);
    },
    //onSuccess:  TODO: Refetch data by invalidating the cache // Display Toast
    //onError: TODO: Handle error here
    // TODO: refactor handlesubmit fun
   });

  const handleSubmit = async () => {
    const token = await getToken();
    if(!token) return;

    const data: typeCreateBoardSchema = {
      title: boardTitle,
      orgId: organization?.id!,
    };

    const validate = createBoardSchema.safeParse(data);
    if (!validate.success) {
      // TODO Display Error in UI
      return;
    }

    mutate({token,data});
    if (isError) {
      console.log(error.message);
    }
    if (isSuccess) {
      console.log(data);
    }
  };

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
        <Button type="submit" disabled={isPending} onClick={handleSubmit}>
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default CreateBoard;
