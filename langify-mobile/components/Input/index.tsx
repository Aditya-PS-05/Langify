import { styled, withStaticProperties, Stack, Input, GetProps, StackProps } from "tamagui";
import { cloneElement } from "react";

type MyInputProps = GetProps<typeof Input> & {
  colorScheme?: keyof typeof colorCombinations;
};

const colorCombinations = {
  red_700: {
    boc: "$red_700",
    borderWidth: 1,
    bs: "solid",
    color: "$red_700",
  },
  gray_600: {
    boc: "$gray_600",
    borderWidth: 1,
    bs: "solid",
    color: "$gray_600",
  },
  white_a700: {
    bg: "$white_a700",
    color: "$indigo_a700",
  },
};

const InputFrame = styled(Stack, {
  dsp: "flex",
  ai: "center",
  jc: "center",
  borderWidth: 1,
  bs: "solid",
  als: "stretch",
  fd: "row",
  f: "unset",
  br: "$1",
  variants: {
    size: {
      xs: {
        h: "$9",
        fos: "$1" as any,
        px: "$4",
      },
    },
    variant: {
      outline: {
        boc: "$gray_600",
        borderWidth: 1,
        bs: "solid",
        color: "$gray_600",
      },
      fill: {
        bg: "$white_a700",
        color: "$indigo_a700",
      },
    },
    shape: {
      round: {
        br: "$1",
      },
    },
  } as const,
});


const InputElement = styled(Input, {
  name: "InputElement",
  flex: 1,
  bg: "transparent",
  borderWidth: 0,
  p: 0,
  m: 0,
  w: "100%",
  ff: "EpilogueMedium",
  fow: "500",
  color: "$gray_600", // Move the color definition here
  focusStyle: {
    outlineWidth: 0,
  },
});


const InputIcon = ({ children }: { children: React.ReactNode }) => cloneElement(children as React.ReactElement);

const MyInput = withStaticProperties(InputFrame, {
  Field: InputElement,
  LeftIcon: (props: { children: React.ReactNode }) => <InputIcon {...props} />,
  RightIcon: (props: { children: React.ReactNode }) => <InputIcon {...props} />,
});

export default MyInput;
