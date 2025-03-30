import { defineStore } from 'pinia'
import {
  getText,
  insertText,
  listTexts,
  type Text,
  updateText,
} from '@/api/texts.ts'

export const useTextsStore = defineStore('texts', () => {
  const textsCache = new Map<string, Text>()

  async function getTexts(id: string): Promise<Text | undefined>
  async function getTexts(): Promise<Text[]>
  async function getTexts(id?: string) {
    if (id === undefined) {
      if (textsCache.size) {
        return Array.from(textsCache.values())
      }

      const texts = await listTexts()
      for (const text of texts) {
        textsCache.set(text.id, text)
      }
      return texts
    }

    if (textsCache.has(id)) {
      return textsCache.get(id)
    }
    const text = await getText(id)

    if (text) {
      textsCache.set(text.id, text)
    }

    return text
  }

  async function saveText(
    text: Text,
  ): Promise<ReturnType<typeof updateText>>
  async function saveText(
    title: string,
    content: string,
  ): Promise<ReturnType<typeof insertText>>
  async function saveText(
    id: string,
    title: string,
    content: string,
  ): Promise<ReturnType<typeof updateText>>
  async function saveText(
    textOrIdOrTitle: string | Text,
    titleOrContent?: string,
    contentOrUndefined?: string,
  ): Promise<ReturnType<typeof insertText> | ReturnType<typeof updateText>> {
    textsCache.clear()
    if (typeof textOrIdOrTitle === 'object') {
      // It's the (text) case
      return updateText(
        textOrIdOrTitle.id,
        textOrIdOrTitle.title,
        textOrIdOrTitle.content,
      )
    }
    if (contentOrUndefined === undefined && titleOrContent) {
      // It's the (title, content) case
      return insertText(textOrIdOrTitle, titleOrContent)
    } else if (titleOrContent && contentOrUndefined) {
      // It's the (id, title, content) case
      return updateText(textOrIdOrTitle, titleOrContent, contentOrUndefined)
    }

    throw new Error('Title or content was empty')
  }

  return {
    getTexts,
    saveText,
  }
})
