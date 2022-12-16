import { Textarea  } from '@nextui-org/react';
    
export default function TextArea({css}) {
  return (
    <Textarea
      label="Special Instructions"
      css={css}
      placeholder="Please enter instructions about this item if any."
    />
  );
}
