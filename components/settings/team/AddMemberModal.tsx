import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInviteMember } from "@/lib/hooks/mutation/useAuthTeam";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const roleTypes = ["ADMIN", "STAFF"] as const;

const inviteSchema = z.object({
  fullName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(100, "Last name must be less than 100 characters long")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "last name can only contain letters, spaces, hyphens, and apostrophes",
    ),
  email: z
    .email("Enter a valid email address")
    .max(100, "email must be less than 100 characters long"),
  role: z.enum(roleTypes),
});

export type InviteData = z.infer<typeof inviteSchema>;

const AddMemberModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const { mutate: inviteMember, isPending } = useInviteMember();
  const { handleSubmit, control } = useForm<InviteData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { role: undefined, fullName: "", email: "" },
  });

  const onSubmit = (data: InviteData) => {
    console.log("Invite Member:", data);

    inviteMember(data, {
      onSuccess: (res) => {
        toast.success(res.message);
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="py-10 px-8 gap-0 md:max-w-[514px]! rounded-[16px] overflow-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold leading-8">
            Invite Team Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <FieldGroup>
            <Controller
              name="fullName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Name"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel htmlFor={field.name} className="form-label">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Email Address"
                    className="form-input"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor={field.name}
                    className="form-label font-semibold! leading-5!"
                  >
                    Role
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      className="form-input !h-14 relative"
                    >
                      <SelectValue placeholder={field.value || "Admin"} />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      {roleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="form-error"
                    />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            disabled={isPending}
            type="submit"
            className="mt-6 submit-button"
          >
            Send Invitation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
