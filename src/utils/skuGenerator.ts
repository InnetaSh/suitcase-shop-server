export function generateSku(name: string, size: string, color: string): string {
  const cleanName = name.trim().toUpperCase().replace(/[^A-ZА-Я0-9]/g, '').slice(0, 4) || 'ITEM';
  const cleanSize = size.trim().toUpperCase() || 'STD';
  const cleanColor = color.trim().toUpperCase() || 'DEF';

  return `${cleanName}-${cleanSize}-${cleanColor}`;
}