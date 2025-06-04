// packages/webapp/src/features/Property/components/PropertyCard.tsx
import React from 'react';
import { Card, Image, Text, Group, Stack, Badge, Avatar, ActionIcon, AspectRatio, Box } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconBedFilled, IconBathFilled, IconDimensions, IconMapPin, IconHeart, IconShare3 } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import type { PropertyWithDetails } from '../../../pages/PropertyDetailsPage/components/types';
import type { PropertyListItem } from '../../../types/property.types'; // Импортируем типы для свойств
import { displayValue } from '../../../utils/displayFormatters'; // Наш хелпер
import classes from './PropertyCard.module.css'; // Создадим этот CSS-модуль

// Временный массив плейсхолдеров для фото, если у property нет images
const placeholderImages = [
    "https://picsum.photos/id/20/600/400",
    "https://picsum.photos/id/101/600/400",
    "https://picsum.photos/id/1011/600/400",
];

export interface PropertyCardProps {
    property: PropertyListItem; // <--- ИСПОЛЬЗУЕМ НОВЫЙ ТИП
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    // Предполагаем, что у property может быть массив images. 
    // Если нет, используем плейсхолдеры.
    const imagesToDisplay = (property.images && property.images.length > 0)
        ? property.images.map(img => img.url)
        : placeholderImages;

    const agentAvatarUrl = property.agent?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(property.agent?.name || 'A')}&background=random`; // Плейсхолдер для аватара

    return (
        <Card shadow="sm" padding="sm" radius="md" withBorder component={Link} to={`/properties/${property.id}`} className={classes.card}>
            <Card.Section className={classes.imageSection}>
                {imagesToDisplay.length > 1 ? (
                    <Carousel
                        withControls
                        withIndicators
                        // height={220} // Задай высоту для карусели
                        classNames={{ control: classes.carouselControl }} // Для стилизации контролов
                        draggable={imagesToDisplay.length > 1}
                    >
                        {imagesToDisplay.map((image, index) => (
                            <Carousel.Slide key={index}>
                                <Image src={image} height={220} alt={property.propertyTitle || 'Property image'} fit="cover" />
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                ) : (
                    <Image src={imagesToDisplay[0]} height={220} alt={property.propertyTitle || 'Property image'} fit="cover" />
                )}
                {/* Аватар агента поверх фото */}
                {property.agent && (
                    <Avatar src={agentAvatarUrl} alt={property.agent.name || 'Agent'} radius="xl" size="lg" className={classes.agentAvatar} />
                )}
                {/* Можно добавить иконку "сердечко" для избранного */}
                <ActionIcon variant="filled" color="red" radius="xl" className={classes.likeButton}>
                    <IconHeart size={18} />
                </ActionIcon>
            </Card.Section>

            <Stack gap="xs" p="md">
                <Group justify="space-between" mt="xs">
                    <Text fw={700} size="xl" c="blue.7" truncate="end">
                        {displayValue(property.price ? parseFloat(property.price.toString()) : null, ' AED')}
                    </Text>
                    {/* Можно добавить бейдж типа "PREMIUM" или "FEATURED" */}
                    {/* <Badge color="yellow" variant="light">FEATURED</Badge> */}
                </Group>

                <Text fw={500} size="lg" truncate="end" className={classes.titleLink}>
                    {property.propertyTitle}
                </Text>

                <Text size="sm" c="dimmed" truncate="end">
                    {property.propertyType?.name || 'N/A'}
                </Text>

                <Group gap="xs" wrap="nowrap" className={classes.features}>
                    <Group gap={4} align="center">
                        <IconBedFilled size={18} className={classes.featureIcon} />
                        <Text size="sm">{displayValue(property.numberOfBedrooms, ' Beds')}</Text>
                    </Group>
                    <Text c="dimmed" size="sm">|</Text>
                    <Group gap={4} align="center">
                        <IconBathFilled size={18} className={classes.featureIcon} />
                        <Text size="sm">{displayValue(property.numberOfBathrooms, ' Baths')}</Text>
                    </Group>
                    <Text c="dimmed" size="sm">|</Text>
                    <Group gap={4} align="center">
                        <IconDimensions size={18} className={classes.featureIcon} />
                        <Text size="sm">{displayValue(property.sizeSqft ? parseFloat(property.sizeSqft.toString()) : null, ' sqft')}</Text>
                    </Group>
                </Group>

                <Group gap={4} align="center" mt="xs">
                    <IconMapPin size={16} className={classes.locationIcon} />
                    <Text size="xs" c="dimmed" truncate="end">
                        {property.location?.locationPath || property.location?.city || 'Location not specified'}
                    </Text>
                </Group>

                {/* Можно добавить теги типа "Marina View | High Floor | Unfurnished" */}
                {/* <Group gap="xs" mt="sm">
            <Badge variant="outline">Marina View</Badge>
            <Badge variant="outline">High Floor</Badge>
            <Badge variant="outline">Unfurnished</Badge>
        </Group> */}
            </Stack>

            {/* Футер карточки с лого компании и кнопкой поделиться (опционально) */}
            {/* <Divider my="xs" />
      <Group justify="space-between">
        <Text size="xs" c="dimmed">Rocky Real Estate</Text> 
        <ActionIcon variant="default" radius="md" size={36}>
            <IconShare3 size={18} stroke={1.5} />
        </ActionIcon>
      </Group> */}
        </Card>
    );
};