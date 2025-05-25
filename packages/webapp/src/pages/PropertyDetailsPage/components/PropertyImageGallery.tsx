// packages/webapp/src/pages/PropertyDetailsPage/components/PropertyImageGallery.tsx
import React from "react";
import {
  Paper,
  Grid,
  AspectRatio,
  Box,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import type { MantineSpacing } from "@mantine/core";
import type { GalleryImage } from "./types";

interface PropertyImageGalleryProps {
  displayImages: GalleryImage[];
  onImageClick: (index: number) => void;
  mb?: MantineSpacing;
}

export const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  displayImages,
  onImageClick,
  mb,
}) => {
  const mainImage = displayImages[0];
  const sideImage1 = displayImages[1];
  const sideImage2 = displayImages[2];

  return (
    <Paper
      shadow="sm"
      radius="md"
      p={0}
      style={{ overflow: "hidden", width: "100%", display: "flex" }}
      mb={mb}
    >
      <Grid gutter="xs" style={{ flexGrow: 1, width: "100%" }} align="stretch">
        <Grid.Col
          span={{ base: 12, sm: 7, md: 8 }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {mainImage && (
            <UnstyledButton
              onClick={() => onImageClick(0)}
              style={{ flexGrow: 1, display: "flex", width: "100%" }}
            >
              <AspectRatio
                ratio={16 / 9}
                style={{ width: "100%", flexGrow: 1 }}
              >
                <Box
                  component="img"
                  src={mainImage.url}
                  alt={mainImage.alt || "Main property view"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </AspectRatio>
            </UnstyledButton>
          )}
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, sm: 5, md: 4 }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Stack
            gap="xs"
            style={{
              flexGrow: 1,
              width: "100%",
              // justifyContent: 'space-between', // Это распределит пространство, если есть излишек
            }}
          >
            {sideImage1 && (
              <UnstyledButton
                onClick={() => onImageClick(1)}
                style={{ flexGrow: 1, display: "flex", width: "100%" }}
              >
                <AspectRatio
                  ratio={16 / 9}
                  style={{ width: "100%", flexGrow: 1 }}
                >
                  <Box
                    component="img"
                    src={sideImage1.url}
                    alt={sideImage1.alt || "Property view 1"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </AspectRatio>
              </UnstyledButton>
            )}
            {sideImage2 && (
              <UnstyledButton
                onClick={() => onImageClick(2)}
                style={{ flexGrow: 1, display: "flex", width: "100%" }}
              >
                <AspectRatio
                  ratio={16 / 9}
                  style={{ width: "100%", flexGrow: 1 }}
                >
                  <Box
                    component="img"
                    src={sideImage2.url}
                    alt={sideImage2.alt || "Property view 2"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                </AspectRatio>
              </UnstyledButton>
            )}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};
