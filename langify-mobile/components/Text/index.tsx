import { styled, Text } from "tamagui";

const MyText = styled(Text, {
  color: "$gray_800",
  ff: "$EpilogueRegular",
  variants: {
    size: {
      s: {},
      textxs: {
        fontSize: "$1",
        lineHeight: 16, // Use numeric values for lineHeight
        fow: "400",
      },
      textmd: {
        fontSize: "$1",
        lineHeight: 22, // Use numeric values for lineHeight
        fow: "400",
      },
      // Keep the dynamic variant option for custom values
      "...": (value) => {
        return {
          fontSize: value,
          fow: "400",
        };
      },
    },
  } as const,
  defaultVariants: {
    size: "s",
  },
});

export default MyText;