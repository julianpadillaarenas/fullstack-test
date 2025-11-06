export abstract class GenericRepository< T, P> {
  abstract findById(id: string): Promise<T | null>
  abstract findAll(): Promise<T[]>
  abstract create(data: P): Promise<T>
  abstract delete(id: string): Promise<void>
}