import { supabase } from '@lib/supabaseClient.ts'
import type { Tables } from '@lib/databaseSchema.ts'

export type Text = Tables<'texts'>

/**
 * Get text
 * @description Get a single text entity
 * @param id The ID of the text to fetch
 */
export async function getText(id: string): Promise<Text | undefined> {
  const { data, error } = await supabase.from('texts').select().eq('id', id)

  if (error) {
    throw error
  }

  return data.at(0)
}

/**
 * List texts
 * @description List all texts for the user
 */
export async function listTexts(): Promise<Text[]> {
  const { data, error } = await supabase.from('texts').select()

  if (error) {
    throw error
  }

  return data
}

/**
 * Insert text
 * @param title Title of the text
 * @param content Body of the text
 */
export async function insertText(title: string, content: string) {
  return supabase.from('texts').insert({
    title,
    content,
  })
}

/**
 * Update text
 * @description Updates an existing piece of text
 * @param id The uuid of the text to update
 * @param title Title of the text
 * @param content Body of the text
 */
export async function updateText(id: string, title: string, content: string) {
  return supabase.from('texts')
    .update({
      title,
      content,
    })
    .eq('id', id)
}
