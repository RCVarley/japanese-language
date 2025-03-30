import type { Meta, StoryObj } from '@storybook/vue3'
import GrammarAnnotator from './GrammarAnnotator.vue'
import { examplePoint } from '@/assets/testdata.ts'

const meta: Meta<typeof GrammarAnnotator> = {
  component: GrammarAnnotator,
  title: 'Grammar Annotator',
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof GrammarAnnotator>

export const no: Story = {
  args: {
    modelValue: examplePoint,
  },
}
