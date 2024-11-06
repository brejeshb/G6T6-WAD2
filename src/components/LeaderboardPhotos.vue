<template>
    <div class="scroll-section">
      <div class="scroll-image-container">
        <img src="image1.jpg" alt="Image 1" class="scroll-image" />
      </div>
      <div class="scroll-image-container">
        <img src="image2.jpg" alt="Image 2" class="scroll-image" />
      </div>
      <div class="scroll-image-container">
        <img src="image3.jpg" alt="Image 3" class="scroll-image" />
      </div>
      <!-- Add more images as needed -->
    </div>
  </template>


<style>
.scroll-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  padding: 50px 0;
}

.scroll-image-container {
  overflow: hidden;
}

.scroll-image {
  opacity: 0;
  transform: scale(0.8); /* Start smaller */
  transition: transform 0.5s ease, opacity 0.5s ease; /* Smooth transition */
  width: 300px; /* Set desired width */
  height: auto;
}

.scroll-image.visible {
  opacity: 1;
  transform: scale(1); /* Grow to full size when visible */
}

</style>


<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const images = document.querySelectorAll('.scroll-image'); // Select all images with the scroll effect

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible'); // Add the 'visible' class when in view
        } else {
          entry.target.classList.remove('visible'); // Remove the 'visible' class when out of view
        }
      });
    },
    { threshold: 0.1 } // Trigger when 10% of the image is visible
  );

  images.forEach((image) => observer.observe(image)); // Observe each image
});


</script>