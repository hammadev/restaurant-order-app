import { Input, Spacer } from "@nextui-org/react";

export default function InputField({placeHolder,value,setValue}) {
  return (
    <>
      <Input
        clearable
        underlined
        labelPlaceholder="Name"
      />
    </>
  );
}
