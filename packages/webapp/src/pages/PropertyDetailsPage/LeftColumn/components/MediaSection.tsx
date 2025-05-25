// packages/webapp/src/pages/PropertyDetailsPage/components/MediaSection.tsx
import React from "react";
import { Title, Anchor, List } from "@mantine/core";
import { IconVideo, IconEye } from "@tabler/icons-react";
import { DetailItem } from "../../components/DetailItem";
import { PropertySectionProps } from "../../components/types";

export const MediaSection: React.FC<PropertySectionProps> = ({ property }) => {
  if (
    !property.videoTourUrl &&
    !property.view360Url &&
    (!property.videosUrl || property.videosUrl.length === 0)
  ) {
    return null;
  }

  return (
    <section>
      <Title order={4} mb="md">
        Media
      </Title>
      {property.videoTourUrl && (
        <DetailItem
          label="Video Tour"
          value={
            <Anchor
              href={property.videoTourUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {property.videoTourUrl}
            </Anchor>
          }
          icon={<IconVideo size={18} />}
          fullWidthValue
        />
      )}
      {property.view360Url && (
        <DetailItem
          label="360 View"
          value={
            <Anchor
              href={property.view360Url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {property.view360Url}
            </Anchor>
          }
          icon={<IconEye size={18} />}
          fullWidthValue
          // mt={property.videoTourUrl ? 'md' : undefined}
        />
      )}
      {property.videosUrl && property.videosUrl.length > 0 && (
        <DetailItem
          label="Other Videos"
          value={
            <List listStyleType="disc" spacing="xs">
              {property.videosUrl.map((url: string, index: number) => (
                <List.Item key={index}>
                  <Anchor href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </Anchor>
                </List.Item>
              ))}
            </List>
          }
          icon={<IconVideo size={18} />}
          fullWidthValue
          // mt={(property.videoTourUrl || property.view360Url) ? 'md' : undefined}
        />
      )}
    </section>
  );
};
