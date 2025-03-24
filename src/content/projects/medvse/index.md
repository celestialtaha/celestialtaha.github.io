---
title: "MEDVSE: Vital Signs Estimation"
description: "Efficient deep learning-based estimation of vital signs on smartphones using fingertip videos."
date: "Apr 11 2022"
demoURL: ""
repoURL: "https://github.com/MahdiFarvardin/MEDVSE"
draft: false
---

![MEDVSE](/images/projects/medvse.jpg)

MEDVSE is a collaborative research project that develops efficient deep learning methods for estimating vital signs (heart rate and blood oxygen saturation) from smartphone videos of fingertips. This work was published as ["Efficient Deep Learning-based Estimation of the Vital Signs on Smartphones"](https://arxiv.org/abs/2204.08989).

## Key Innovations

- **Smartphone-based Vital Signs**: Non-invasive estimation of heart rate and SpO2 using only a smartphone camera
- **Custom Dataset**: Created MTHS (Medical Taha-Mahdi Heart rate and SpO2) dataset for training and evaluation
- **Efficient Architecture**: Optimized neural network design for mobile deployment
- **Real-time Processing**: Capable of processing video streams for immediate vital sign estimation
- **High Accuracy**: Achieved state-of-the-art results for smartphone-based vital sign monitoring

## Technical Approach

The project uses a deep learning approach to process RGB signals extracted from fingertip videos:
- RGB signal extraction from video frames
- Signal preprocessing and feature extraction
- Deep neural network for vital sign estimation
- Validation against medical-grade reference devices

## Dataset

As part of this project, we created and released the MTHS dataset:
- Fingertip videos from multiple subjects
- Ground truth data from medical devices
- RGB signals sampled at 30Hz
- Heart rate and SpO2 measurements sampled at 1Hz

## Applications in Healthcare

- **Remote Patient Monitoring**: Allow patients to monitor vital signs at home
- **Telehealth**: Support remote clinical assessment
- **Personal Health Tracking**: Enable individuals to track their vital signs regularly
- **Resource-Limited Settings**: Provide vital sign monitoring where medical equipment is limited
- **COVID-19 Monitoring**: Support home monitoring of respiratory parameters

This collaborative project with [Mahdi Farvardin](https://github.com/MahdiFarvardin) demonstrates how deep learning can transform smartphones into powerful tools for health monitoring, making vital sign measurement more accessible worldwide.
