# MEDVSE evidence used in the portfolio

Checked 3 November 2026 against the article's abstract and complete table elements supplied by the [Europe PMC full-text API](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC13158377/fullTextXML). Canonical publication: [Samavati, Farvardin and Ghaffari, Healthcare Technology Letters (2026)](https://doi.org/10.1049/htl2.70083).

- Table 2 supplies exact parameter counts: DCT 3,266; FCN 8,037; Base 29,665; Residual FCN 53,713. The summary range is rounded to 3.3K–53.7K.
- Table 5 supplies session-wise PPG-DaLiA heart-rate MAE and standard deviation. The DCT row is the variant without inversion. Values are transcribed in `src/data/medvse-models.json`.
- The comparison is between four architectures from this paper, not a claim of superiority over all published approaches. It preserves the reported variation and identifies its dataset and units.
- The abstract describes 62 MTHS fingertip recordings with HR and SpO₂ annotations. Respiratory-rate results come from other datasets; the portfolio keeps that distinction explicit.

No paper figures were republished. The portfolio presents numerical facts in an accessible native HTML table. Keep the data, captions, and citations together when updating the comparison.
