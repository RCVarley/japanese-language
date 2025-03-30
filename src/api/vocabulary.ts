import { supabase } from '@lib/supabaseClient.ts'
import type { Tables } from '@lib/databaseSchema.ts'

export type Vocabulary = Tables<'vocabulary'>

/**
 * Get vocabulary
 */
export async function getVocabulary(): Promise<Vocabulary[]> {
  const { data, error } = await supabase
    .from('vocabulary')
    .select()

  if (error) {
    throw error
  }

  return data
}

/**
 * Insert vocabulary
 * @param vocabulary
 * @param sentenceId
 */
export async function insertVocabulary(
  vocabulary: Omit<Vocabulary, 'id' | 'created_at' | 'user_id'>,
  sentenceId?: string,
) {
  const { data, error } = await supabase
    .from('vocabulary')
    .insert(vocabulary)
    .select()

  console.log('vocabulary:', data)

  if (error) {
    throw error
  }

  if (sentenceId) {
    const { error: joinError } = await supabase
      .from('join_vocabulary_sentence')
      .insert({ sentence_id: sentenceId, vocabulary_id: data[0].id })

    if (joinError) {
      throw joinError
    }
  }

  return data
}

/**
 * Update vocabulary
 * @description Updates an existing piece of vocabulary
 * @param vocabulary
 */
export async function updateVocabulary(
  vocabulary: Omit<Vocabulary, 'created_at' | 'user_id'>,
) {
  return supabase
    .from('texts')
    .update(vocabulary)
    .eq('id', vocabulary.id)
}
