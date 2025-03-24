---
title: "ConvNeXt TensorFlow/Keras"
description: "TensorFlow/Keras implementation of the ConvNeXt architecture from Facebook Research."
date: "Jan 21 2022"
demoURL: ""
repoURL: "https://github.com/celestialtaha/ConvNeXt-tf-keras"
draft: false
---

![ConvNeXt TensorFlow](/images/projects/convnext.jpg)

A TensorFlow/Keras implementation of the ConvNeXt architecture, a modern convolutional neural network design that bridges the gap between CNNs and Transformers. This implementation makes the cutting-edge ConvNeXt architecture accessible to TensorFlow users.

## About ConvNeXt

ConvNeXt is a pure convolutional model that incorporates design principles from Vision Transformers, resulting in state-of-the-art performance while maintaining the efficiency and simplicity of CNNs. As described in the [original paper](https://arxiv.org/abs/2201.03545) by Facebook Research, the architecture modernizes the ResNet design with:

- Patchify stem to process images in patches
- Inverted bottleneck design
- Larger kernels for increased receptive field
- Layer normalization for better training stability
- Fewer activation functions for improved performance

## Implementation

```python
from main import create_convnext_model

model = create_convnext_model(input_shape=(224, 224, 3), depths=[3, 3, 9, 3], dims=[96, 192, 384, 768], num_classes=1000)
print(model.summary())

model = create_convnext_model(depths=[3, 3, 9, 3], dims=[96, 192, 384, 768], num_classes=1000, drop_path=2., layer_scale_init_value=1e-6)
print(model.summary())
```

## Technologies

- TensorFlow 2.x
- Keras
- Deep Learning
- Computer Vision
- Image Classification

This implementation enables TensorFlow users to leverage the power of ConvNeXt for various computer vision tasks, providing a modern CNN architecture that competes with Transformer-based models while maintaining computational efficiency.
