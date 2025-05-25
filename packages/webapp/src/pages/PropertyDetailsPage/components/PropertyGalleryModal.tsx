// packages/webapp/src/pages/PropertyDetailsPage/components/PropertyGalleryModal.tsx
import React from "react";
import { Modal, Text, Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import type { GalleryImage } from "./types";

interface PropertyGalleryModalProps {
  opened: boolean;
  onClose: () => void;
  images: GalleryImage[];
  initialSlide?: number;
}

export const PropertyGalleryModal: React.FC<PropertyGalleryModalProps> = ({
  opened,
  onClose,
  images,
  initialSlide = 0,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Property Gallery"
      size="xl"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {images.length > 0 ? (
        <Carousel
          withIndicators
          withControls
          initialSlide={initialSlide}
          // height={500} // Опционально, если нужна фиксированная высота
        >
          {images.map((image, index) => (
            <Carousel.Slide key={image.id || index}>
              <Image
                src={image.url}
                alt={image.alt}
                fit="contain"
                h="auto"
                mah="70vh"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Text>No images available for this property.</Text>
      )}
    </Modal>
  );
};
