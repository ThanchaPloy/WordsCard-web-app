// src/hooks/useDictionary.js
import { useState } from "react";

export function useDictionary() {
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchWord = async (word) => {
    if (!word.trim()) return null;
    setFetching(true);
    setFetchError(null);
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim())}`
      );
      if (!res.ok) throw new Error(`ไม่พบคำว่า "${word}"`);
      const data = await res.json();
      const entry = data[0];
      const firstMeaning = entry.meanings?.[0]?.definitions?.[0];
      return {
        word:         entry.word || word,
        phonetic:     entry.phonetic || entry.phonetics?.[0]?.text || "",
        meaning:      firstMeaning?.definition || "",
        example:      firstMeaning?.example || "",
        partOfSpeech: entry.meanings?.[0]?.partOfSpeech || "",
      };
    } catch (err) {
      setFetchError(err.message);
      return null;
    } finally {
      setFetching(false);
    }
  };

  return { fetchWord, fetching, fetchError, setFetchError };
}
