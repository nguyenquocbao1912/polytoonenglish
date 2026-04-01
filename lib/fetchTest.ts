import { createClient } from "@supabase/supabase-js"
import { DbTest } from "@/components/test-engine-utils"

export async function fetchTest(testId: number): Promise<DbTest | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabaseAdmin = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabaseAdmin
    .from("tests")
    .select(
      `
      id, title, time_limit, audio_url,
      test_parts (
        id, test_id, part_number, audio_url,
        question_groups (
          id, part_id, passage_text, transcript, image_url,
          questions (
            id, group_id, question_text,
            option_a, option_b, option_c, option_d,
            correct_answer
          )
        )
      )
    `
    )
    .eq("id", testId)
    .single()

  if (error) {
    console.error("fetchTest Error:", error.message)
    return null
  }

  return data as DbTest
}
