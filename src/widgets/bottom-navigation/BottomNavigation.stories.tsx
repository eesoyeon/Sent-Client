import type { Meta, StoryObj } from "@storybook/react";

import BottomNavigation from "./BottomNavigation";

const meta: Meta<typeof BottomNavigation> = {
  component: BottomNavigation,
  title: "Components/BottomNavigation",
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {},
};
