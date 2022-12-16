import { Input, Spacer } from "@nextui-org/react";

export default function InputField({placeHolder,value,setValue}) {
  return (
    <>
      <Input
        label={placeHolder}
        placeholder={placeHolder}
        css={{width:'100%',marginTop:10,marginBottom:10}}
      />
    </>
  );
}
