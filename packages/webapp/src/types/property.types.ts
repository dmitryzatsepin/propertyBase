// packages/webapp/src/pages/PropertyDetailsPage/components/types.ts
// ... (существующие типы PropertyPortal, PropertyAmenity, и т.д.) ...

// НОВЫЙ ТИП для элемента в списке свойств
export type PropertyListItemLocation = {
  id: string;
  city: string | null; // Сделаем null-безопасными, если могут быть null
  community: string | null;
  locationPath: string | null;
};

export type PropertyListItemAgent = {
  id: string;
  name: string | null;
  avatarUrl?: string | null; // Если будем добавлять
};

export type PropertyListItemType = {
  id: string;
  name: string | null;
} | null; // Может быть не выбран

export type PropertyListItem = {
  id: string;
  propertyRefNo: string;
  propertyTitle: string;
  price?: string | null;
  numberOfBedrooms?: string | null;
  numberOfBathrooms?: string | null;
  sizeSqft?: string | null;
  
  // Связанные данные, как они приходят из property.list
  location: PropertyListItemLocation | null;
  agent: PropertyListItemAgent | null;
  propertyType: PropertyListItemType;
  offeringType: PropertyListItemType; // Предполагаем, что структура такая же
  
  // Если раскомментировал _count на бэкенде
  // _count?: {
  //   images?: number;
  // };

  // Добавь сюда другие поля, которые возвращает property.list
  // например, createdAt для сортировки, если нужно
  createdAt: string; // Обычно есть для orderBy

  // Если у тебя есть поле для главного изображения в списке
  mainImageUrl?: string | null; 
  images?: Array<{ url: string }>; // Если передаешь массив фото для карусели в карточке
};

// PropertyWithDetails остается как есть для детальной страницы
export type PropertyWithDetails = { /* ... как было ... */ };

export interface PropertySectionProps {
  property: PropertyWithDetails;
}