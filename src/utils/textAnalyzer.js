// Text analysis utilities for AI features
export const TextAnalyzer = {
  // Extract keywords from text
  extractKeywords: (text, limit = 10) => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const stopWords = new Set([
      "this",
      "that",
      "with",
      "have",
      "will",
      "from",
      "they",
      "know",
      "want",
      "been",
      "good",
      "much",
      "some",
      "time",
      "very",
      "when",
      "come",
      "here",
      "just",
      "like",
      "long",
      "make",
      "many",
      "over",
      "such",
      "take",
      "than",
      "them",
      "well",
      "were",
    ]);

    const wordFreq = {};
    words.forEach((word) => {
      if (!stopWords.has(word) && word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([word, freq]) => ({ word, frequency: freq }));
  },

  // Calculate reading time
  calculateReadingTime: (text, wordsPerMinute = 200) => {
    const wordCount = text
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  // Analyze text complexity
  analyzeComplexity: (text) => {
    const sentences = text
      .replace(/<[^>]*>/g, "")
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    const words = text
      .replace(/<[^>]*>/g, "")
      .trim()
      .split(/\s+/);

    const avgWordsPerSentence = words.length / sentences.length || 0;
    const avgCharsPerWord =
      words.reduce((sum, word) => sum + word.length, 0) / words.length || 0;

    let complexity = "Simple";
    if (avgWordsPerSentence > 20 || avgCharsPerWord > 6) {
      complexity = "Complex";
    } else if (avgWordsPerSentence > 15 || avgCharsPerWord > 5) {
      complexity = "Moderate";
    }

    return {
      complexity,
      avgWordsPerSentence: Math.round(avgWordsPerSentence),
      avgCharsPerWord: Math.round(avgCharsPerWord),
      sentences: sentences.length,
      words: words.length,
    };
  },

  // Generate summary suggestions
  generateSummary: (text, maxSentences = 3) => {
    const sentences = text
      .replace(/<[^>]*>/g, "")
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0)
      .map((s) => s.trim());

    if (sentences.length <= maxSentences) {
      return sentences;
    }

    // Simple scoring based on sentence length and position
    const scoredSentences = sentences.map((sentence, index) => {
      let score = sentence.length;

      // Boost score for first and last sentences
      if (index === 0 || index === sentences.length - 1) {
        score *= 1.5;
      }

      // Boost score for sentences with keywords
      const keywords = this.extractKeywords(text, 5);
      keywords.forEach(({ word }) => {
        if (sentence.toLowerCase().includes(word)) {
          score *= 1.2;
        }
      });

      return { sentence, score, index };
    });

    return scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, maxSentences)
      .sort((a, b) => a.index - b.index)
      .map((item) => item.sentence);
  },

  // Basic sentiment analysis
  analyzeSentiment: (text) => {
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "amazing",
      "wonderful",
      "fantastic",
      "love",
      "like",
      "enjoy",
      "happy",
      "excited",
      "success",
      "win",
      "best",
      "awesome",
      "brilliant",
      "perfect",
      "outstanding",
    ];

    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "horrible",
      "hate",
      "dislike",
      "sad",
      "angry",
      "frustrated",
      "fail",
      "lose",
      "worst",
      "boring",
      "difficult",
      "problem",
      "issue",
      "trouble",
    ];

    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach((word) => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });

    const total = positiveCount + negativeCount;
    if (total === 0) return "Neutral";

    const ratio = positiveCount / total;
    if (ratio > 0.6) return "Positive";
    if (ratio < 0.4) return "Negative";
    return "Neutral";
  },
};
