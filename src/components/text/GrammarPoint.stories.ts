import type { Meta, StoryObj } from '@storybook/vue3'
import GrammarPointComponent from './GrammarPoint.vue'
import { examplePoint } from "@/assets/testdata.ts";

const meta: Meta<typeof GrammarPointComponent> = {
  component: GrammarPointComponent,
  title: 'Grammar Point',
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof GrammarPointComponent>

export const no: Story = {
  args: {
    modelValue: examplePoint,
  },
}