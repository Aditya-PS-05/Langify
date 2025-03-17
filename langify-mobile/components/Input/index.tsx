import { styled, withStaticProperties, Stack, Input, GetProps } from "tamagui";
import { cloneElement } from "react";

// Define our variants as proper types
type InputVariants = {
  size?: "xs";
  variant?: "outline" | "fill";
  shape?: "round";
  colorScheme?: string;
};

// Create a proper type for our input props
type MyInputProps = GetProps<typeof Input> & InputVariants;

// Fix: Use the correct typing pattern for variant spread functions
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
        fontSize: "$1", // Fix: change 'fos' to 'fontSize'
        px: "$4",
      },
    },
    variant: {
      outline: (props: { colorScheme?: string }) => {
        const { colorScheme } = props;
        const colorCombinations: Record<string, any> = {
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
        };
        return colorScheme ? colorCombinations[colorScheme] : colorCombinations.gray_600;
      },
      fill: (props: { colorScheme?: string }) => {
        const { colorScheme } = props;
        const colorCombinations: Record<string, any> = {
          white_A700: {
            bg: "$white_a700",
            color: "$indigo_a700",
          },
        };
        return colorScheme ? colorCombinations[colorScheme] : undefined;
      },
    },
    shape: {
      round: {
        br: "$1",
      },
    },
    // Define colorScheme as a proper variant with empty object
    colorScheme: {}, 
  } as const,
  defaultVariants: {
    variant: "outline",
    size: "xs",
    colorScheme: "gray_600" as any,
  },
});

const InputElement = styled(Input, {
  name: "InputElement",
  flex: 1,
  bg: "transparent",
  borderWidth: 0,
  p: 0,
  m: 0,
  w: "100%",
  h: "100%",
  ff: "$EpilogueMedium",
  fow: "500",
  focusStyle: {
    outlineWidth: 0,
  },
});

const InputIcon = ({ children }: { children: React.ReactNode }) => {
  return cloneElement(children as React.ReactElement);
};

const MyInput = withStaticProperties(InputFrame, {
  Field: InputElement,
  LeftIcon: (props: { children: React.ReactNode }) => <InputIcon {...props} />,
  RightIcon: (props: { children: React.ReactNode }) => <InputIcon {...props} />,
});

export default MyInput;
export type { MyInputProps, InputVariants };