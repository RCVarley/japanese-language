import type { Meta, StoryObj } from '@storybook/vue3'

import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    color: {
      options: ['grammar', 'sentence', 'word'],
    },
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    text: 'Mark word',
    name: 'mark-word',
  },
}
