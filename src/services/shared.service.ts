export class ColorUtil {
  // Generate random color
  static generateRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    let isGrayScale = true;

    while (isGrayScale) {
      color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      const rgb = ColorUtil.hexToRgb(color);
      isGrayScale = rgb.r === rgb.g && rgb.g === rgb.b;
    }

    return color;
  }

  // Convert hex to RGB
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
}
