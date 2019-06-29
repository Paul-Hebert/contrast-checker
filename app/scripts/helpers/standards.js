/**
 * An object storing the AA and AAA standards for small text and large text,
 * as well as text to display for the different scores.
 */
export const standards = {
  smallText: [
    {
      minimum: 7,
      score: 'AAA',
      details: `
                This contrast ratio meets the highest level of contrast 
                requirements for small text outlined by the WCAG.
            `
    },
    {
      minimum: 4.5,
      score: 'AA',
      details: `
                This contrast ratio meets the minimum requirements for 
                small text. To meet the more stringent AAA requirements you need
                a contrast ratio of 7 or above.
            `
    },
    {
      minimum: 0,
      score: 'Fail',
      details: `
                This contrast ratio fails to meet the minimum contrast ratios 
                for small text. To meet the more minimum AA requirements you
                need a contrast ratio of 4.5 or above.
            `
    }
  ],
  largeText: [
    {
      minimum: 4.5,
      score: 'AAA',
      details: `
                This contrast ratio meets the highest level of contrast 
                requirements for large text outlined by the WCAG.
            `
    },
    {
      minimum: 3,
      score: 'AA',
      details: `
                This contrast ratio meets the minimum requirements for 
                large text. To meet the more stringent AAA requirements you need
                a contrast ratio of 4.5 or above.
            `
    },
    {
      minimum: 0,
      score: 'Fail',
      details: `
                This contrast ratio fails to meet the minimum contrast ratios 
                for large text. To meet the more minimum AA requirements you
                need a contrast ratio of 3 or above.
            `
    }
  ]
};
