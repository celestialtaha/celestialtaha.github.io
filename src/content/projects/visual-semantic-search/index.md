---
title: "Visual Semantic Search"
description: "Natural-language product discovery using shared text and image embeddings."
date: "Jun 20 2024"
demoURL: ""
repoURL: "https://github.com/celestialtaha/visual-semantic-search"
draft: false
---

A product search experiment that connects a written description to relevant images. CLIP places language and images in a shared embedding space; a vector search retrieves nearby products.

## Two paths, one search system

The system separates catalog preparation from interactive queries. Celery manages image-encoding jobs with Redis as its broker and result backend. Qdrant stores the resulting vectors.

For search, a Streamlit interface connects to a FastAPI backend. The query becomes an embedding that can be compared with the catalog’s image embeddings. Docker Compose brings the application services together for local use.

## The engineering decision

Image encoding is background work; answering a search is interactive work. Keeping those paths separate makes their responsibilities explicit. The model is one part of the project—the API, job queue, storage, and interface make it usable.

## What this demonstrates

The project connects multimodal retrieval with a concrete backend architecture. It is an open-source implementation; the repository does not publish a retrieval benchmark or production-scale performance results.

The [source and setup instructions](https://github.com/celestialtaha/visual-semantic-search) document the application. The [Compose configuration](https://github.com/celestialtaha/visual-semantic-search/blob/main/docker-compose.yaml) shows how the services are connected.
