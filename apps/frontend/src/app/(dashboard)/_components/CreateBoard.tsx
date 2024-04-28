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

type Props = {};

const CreateBoard = (props: Props) => {
  const { organization } = useOrganization();
  const { getToken } = useAuth();

  const { mutate,data, error, isError, isSuccess, isPending } = useMutation({
    mutationFn: (token: string) =>
      createBoard(token, {
        title: "hii",
        orgId: organization?.id!,
      }),
  });

  const handleSubmit = async () => {
    const token = await getToken();
    mutate("token"!);
    if(isError){
        console.log(error.message)
    }
    if(isSuccess){
        console.log(data?.data.success)
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
          <Input id="name" defaultValue="Board-1" className="col-span-3" />
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
