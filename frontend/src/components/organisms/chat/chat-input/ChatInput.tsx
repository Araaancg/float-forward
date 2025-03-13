import TextField from "@/components/molecules/inputs/text-field/TextField";
import Button from "@/components/atoms/button/Button";
import SendMessageIcon from "@/components/atoms/icons/SendMessageIcon";
import "./chat-input.scss";
import { useForm } from "react-hook-form";

const ChatInput = ({ sendData }: any) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    sendData(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row justify-between items-center p-4 bg-white-full"
    >
      <TextField
        register={register}
        errors={errors}
        name="message"
        type="text"
        placeholder="Write your message"
      />
      <Button
        isLink
        variant="no-color"
        color="black"
        className="ml-4"
        type="submit"
      >
        <SendMessageIcon size={24} />
      </Button>
    </form>
  );
};

export default ChatInput;
