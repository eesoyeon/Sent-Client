import type { Meta, StoryObj } from "@storybook/react";

import HeaderNavigation from "./HeaderNavigation";

const meta: Meta<typeof HeaderNavigation> = {
  component: HeaderNavigation,
  title: "Category/HeaderNavigation",
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof HeaderNavigation>;

export const Default: Story = {
  args: {},
};
