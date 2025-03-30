// deno-fmt-ignore
// export const hiragana = new Set([
//   // Basic Hiragana
//   "あ", "い", "う", "え", "お",
//   "か", "き", "く", "け", "こ",
//   "さ", "し", "す", "せ", "そ",
//   "た", "ち", "つ", "て", "と",
//   "な", "に", "ぬ", "ね", "の",
//   "は", "ひ", "ふ", "へ", "ほ",
//   "ま", "み", "む", "め", "も",
//   "や", "ゆ", "よ",
//   "ら", "り", "る", "れ", "ろ",
//   "わ", "を", "ん",
//
//   // Dakuten (゛) variations
//   "が", "ぎ", "ぐ", "げ", "ご",
//   "ざ", "じ", "ず", "ぜ", "ぞ",
//   "だ", "ぢ", "づ", "で", "ど",
//   "ば", "び", "ぶ", "べ", "ぼ",
//
//   // Handakuten (゜) variations
//   "ぱ", "ぴ", "ぷ", "ぺ", "ぽ",
//
//   // Small Kana
//   "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
//   "っ", "ゃ", "ゅ", "ょ"
// ])
//
// // deno-fmt-ignore
// const katakana = new Set([
//   // Basic Katakana
//   "ア", "イ", "ウ", "エ", "オ",
//   "カ", "キ", "ク", "ケ", "コ",
//   "サ", "シ", "ス", "セ", "ソ",
//   "タ", "チ", "ツ", "テ", "ト",
//   "ナ", "ニ", "ヌ", "ネ", "ノ",
//   "ハ", "ヒ", "フ", "ヘ", "ホ",
//   "マ", "ミ", "ム", "メ", "モ",
//   "ヤ", "ユ", "ヨ",
//   "ラ", "リ", "ル", "レ", "ロ",
//   "ワ", "ヲ", "ン",
//
//   // Dakuten (゛) variations
//   "ガ", "ギ", "グ", "ゲ", "ゴ",
//   "ザ", "ジ", "ズ", "ゼ", "ゾ",
//   "ダ", "ヂ", "ヅ", "デ", "ド",
//   "バ", "ビ", "ブ", "ベ", "ボ",
//
//   // Handakuten (゜) variations
//   "パ", "ピ", "プ", "ペ", "ポ",
//
//   // Small Kana
//   "ァ", "ィ", "ゥ", "ェ", "ォ",
//   "ッ", "ャ", "ュ", "ョ"
// ])

// https://github.com/darren-lester/nihongo/blob/2ca0fbfac7aa41c8b5d8476fc6da0ab1f0ea27e7/src/analysers.js#L16
export function useJapanese() {
  function isHiragana(char: string) {
    // return hiragana.has(char)
    return char >= '\u3040' && char <= '\u309f'
  }

  // https://github.com/darren-lester/nihongo/blob/2ca0fbfac7aa41c8b5d8476fc6da0ab1f0ea27e7/src/analysers.js#L21
  function isKatakana(char: string) {
    // return katakana.has(char)
    return char >= '\u30a0' && char <= '\u30ff'
  }

  // https://github.com/darren-lester/iskanji/blob/fa593f30584d4f007e520a03391525f0e6922730/index.js#L8
  function isKanji(char: string) {
    return (char >= '\u4e00' && char <= '\u9faf') ||
      (char >= '\u3400' && char <= '\u4dbf') ||
      char === '𠮟'
  }

  function isJapanese(char: string) {
    return isHiragana(char) || isKatakana(char) || isKanji(char)
  }

  function isPunctuation(char: string) {
    return char >= '　' && char <= '〿'
  }

  function isWhitespace(char: string) {
    return /\s/.test(char)
  }

  function isNumeric(char: string) {
    return /\d/.test(char)
  }

  return {
    isHiragana,
    isKatakana,
    isKanji,
    isJapanese,
    isPunctuation,
    isWhitespace,
    isNumeric,
  }
}
