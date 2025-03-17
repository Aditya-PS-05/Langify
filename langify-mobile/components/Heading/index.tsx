import { styled, Heading } from "tamagui";

const MyHeading = styled(Heading, {
  color: "$indigo_a700",
  ff: "$EpilogueBold",
  tt: "none",
  variants: {
    size: { textxs: {}, s: {}, md: {}, textmd: {}, xs: {} },
  } as const,
  defaultVariants: {
    size: "xs",
  },
});

export default MyHeading;
