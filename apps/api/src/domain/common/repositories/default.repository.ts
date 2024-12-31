export abstract class DefaultRepository<T> {
  abstract create(entity: Omit<T, 'id'>): Promise<T>
  abstract list(): Promise<T[]>
  abstract findById(id: string): Promise<T | null>
  abstract update(id: string, entity: Omit<T, 'id'>): Promise<T>
  abstract delete(id: string): Promise<void>
}
