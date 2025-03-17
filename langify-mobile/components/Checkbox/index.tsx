import React from "react";
import { styled, withStaticProperties, XStack, Checkbox as TCheckbox, Label as TLabel } from "tamagui";
import { Check } from "@tamagui/lucide-icons";

const CheckboxFrame = styled(XStack, {
  name: "CheckboxFrame",
  gap: 10,
  ai: "center",
});

const CheckboxField = styled(TCheckbox, {
  name: "Checkbox",
  overflow: "hidden",
  p: 0,
  dsp: "flex",
  ai: "center",
  gap: 5,
  variants: {
    size: {
      xs: {
        h: "$5",
        w: 20,
      },
    },
    variant: {},
  } as const,
  defaultVariants: {
    size: "xs",
  },
});

const CheckboxLabel = styled(TLabel, {
  name: "CheckboxLabel",
  ff: "$EpilogueRegular" as any,
  flexShrink: 1,
});

const CheckboxIndicator = styled(TCheckbox.Indicator, {
  name: "CheckboxIndicator",
  jc: "center",
  ai: "center",
  h: "100%",
  w: "100%",
});

const CheckboxIcon = (props: React.ComponentPropsWithoutRef<typeof Check>) => (
  <Check h="90%" w="90%" mah="100%" maw="100%" {...props} />
);

const Checkbox = withStaticProperties(CheckboxFrame, {
  Field: CheckboxField,
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
  Icon: CheckboxIcon,
});

export default Checkbox;
