import type { Preview } from '@storybook/vue3'

import '../src/assets/style/index.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(sentence|grammar|word)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
