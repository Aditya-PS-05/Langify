import { styled, Text } from "tamagui";

const MyText = styled(Text, {
  color: "$gray_800",
  ff: "$EpilogueRegular",
  variants: {
    size: {
      textxs: {
        fos: "$1",
        fow: "400",
      },
      s: {
        fos: "$2",
        fow: "400",
      },
      textmd: {
        fos: "$4",
        fow: "600",
      },
    },
  } as const,
  defaultVariants: {
    size: "s",
  },
});

export default MyText;
