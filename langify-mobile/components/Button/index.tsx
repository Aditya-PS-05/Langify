import { cloneElement, forwardRef } from "react";
import { styled, GetProps } from "@tamagui/core";
import { View, Button as TButton } from "tamagui";
import Text from "../Text";

import type { ElementRef, Ref } from "react";

type BaseProps = {
  variant?: "fill";
  size?: "xs";
  shape?: "round";
  icon?: React.ReactElement;
  iconAfter?: React.ReactElement;
  colorScheme?: string;
};

type TextProps = Omit<GetProps<typeof TButton.Text>, keyof BaseProps>;
type FrameProps = Omit<GetProps<typeof Base>, keyof TextProps>;
type Props = FrameProps & TextProps & BaseProps;

const textColors: any = {
  fill: {
    gray_400: "$lime_50",
    white_A700: "$indigo_a700",
    indigo_A700: "$lime_50",
  },
};

const textSizes: Record<NonNullable<Props["size"]>, any> = { xs: "$3" };

const Button = (props: Props, ref: Ref<ElementRef<typeof Base>>) => {
  const {
    variant = "fill",
    shape,
    size = "xs",
    children,
    icon,
    iconAfter,
    fontWeight = "400",
    colorScheme = "indigo_A700",
    ls,
    fow,
    ...buttonProps
  } = props;

  const iconOnly = !children && Boolean(icon);
  const textColor = textColors[variant]?.[colorScheme as string];
  const textSize = textSizes[size];

  return (
    <Base
      ref={ref}
      variant={variant}
      shape={shape}
      size={size}
      iconOnly={iconOnly}
      colorScheme={colorScheme}
      {...buttonProps}
    >
      {icon
        ? cloneElement(icon, {
            color: iconOnly ? textColor : icon.props.color ?? textColor,
          })
        : null}
      <Text color={textColor} size={textSize} ls={ls} fow={fow} ff="$EpilogueBold" fos="$3">
        {children}
      </Text>
      {iconAfter
        ? cloneElement(iconAfter, { color: iconAfter.props.color ?? textColor })
        : null}
    </Base>
  );
};

const MyButton = forwardRef(Button);

const Base = styled(View, {
  name: "Button",
  role: "button",
  als: "stretch",
  bg: "transparent",
  dsp: "flex",
  fd: "row",
  ai: "center",
  jc: "center",
  br: "$1",
  pressStyle: { opacity: 0.8, scale: 0.99 },
  variants: {
    size: {
      xs: {
        h: "$9",
        px: "$5",
      },
    },
    variant: {
      fill: (_, { props }: { props: any }) => {
        const { colorScheme } = props;
        const colorCombinations = {
          gray_400: { bg: "$gray_400", color: "$lime_50" },
          white_A700: { bg: "$white_a700", color: "$indigo_a700" },
          indigo_A700: { bg: "$indigo_a700", color: "$lime_50" },
        };
        return colorScheme
          ? colorCombinations[colorScheme as keyof typeof colorCombinations]
          : undefined;
      },
    },
    shape: {
      round: { br: "$1" },
    },
    iconOnly: {
      true: {
        gap: 0,
        padding: 0,
        aspectRatio: 1,
      },
    },
  },
  colorScheme: {} as Record<string, any>,
} as const);

export default MyButton;
export type { Props as ButtonProps };
