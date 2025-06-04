// packages/webapp/src/pages/PropertyDetailsPage/components/PropertyGalleryModal.tsx
import React from "react";
import { Modal, Text, Image, Center } from "@mantine/core";
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
  console.log(
    "PropertyGalleryModal rendered. Opened:",
    opened,
    "Images count:",
    images?.length
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Property Gallery"
      size="90%"
      centered
      keepMounted={true}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      {images && images.length > 0 ? (
        <Carousel
          withIndicators
          withControls
          initialSlide={initialSlide}
          height={500}
          style={{ position: "relative", zIndex: 9999 }}
        >
          {images.map((image, index) => (
            <Carousel.Slide key={image.id || index}>
              <Center
                style={{
                  height: "100%",
                  //maxHeight: "calc(100vh - 160px)",
                  width: "100%",
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fit="contain" // Попробуй cover
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    //display: "block",
                    //margin: "auto",
                    border: "1px solid red",
                  }}
                />
              </Center>
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Text>No images available for this property.</Text>
      )}
    </Modal>
  );
};
