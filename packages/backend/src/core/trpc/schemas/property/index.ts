// packages/backend/src/core/trpc/schemas/property/index.ts
export * from "./create.schema";
export * from "./update.schema";
export * from "./query.schema";
// propertyBaseSchema не экспортируем отсюда, так как она в основном для внутреннего использования в других схемах property.
// Если она понадобится где-то еще напрямую, можно будет добавить.
