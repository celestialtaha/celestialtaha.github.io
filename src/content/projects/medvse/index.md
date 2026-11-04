---
title: "MEDVSE: Vital Signs Estimation"
description: "Efficient deep learning-based estimation of vital signs on smartphones using fingertip videos."
date: "Apr 11 2022"
demoURL: ""
repoURL: "https://github.com/MahdiFarvardin/MEDVSE"
draft: false
---

MEDVSE began as collaborative research into estimating heart rate and blood oxygen saturation from smartphone fingertip video. The [2022 preprint](https://arxiv.org/abs/2204.08989) is connected to our later journal article, [Parameter-Efficient Deep Learning Models for Vital Sign Estimation From PPG](https://doi.org/10.1049/htl2.70083), published in *Healthcare Technology Letters* in 2026.

## From video to a vital signal

The pipeline extracts RGB signals from fingertip recordings, preprocesses the signal, and applies compact neural models to estimate vital signs. Reference measurements provide targets for training and evaluation.

The research asks a practical question: how much model capacity is needed to recover useful information from these signals when memory and compute are limited?

## Designing for mobile constraints

The 2026 paper explores parameter-efficient models for heart rate, blood oxygen saturation and respiratory rate estimation. It compares compact fully convolutional and DCT-based architectures and demonstrates on-device deployment using TensorFlow Lite. See the paper for the evaluation settings and results for each task.

## The MTHS dataset

The project includes the MTHS dataset of fingertip video recordings and reference vital-sign measurements. The [original MEDVSE repository](https://github.com/MahdiFarvardin/MEDVSE) provides the earlier project's code and dataset information; the journal article describes the later research.

## Collaboration and publication history

This work was carried out with [Mahdi Farvardin](https://github.com/MahdiFarvardin) and Aboozar Ghaffari. Both the earlier preprint and the 2026 journal record are linked on the [research page](/research/#medvse).
