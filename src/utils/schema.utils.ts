export function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}
