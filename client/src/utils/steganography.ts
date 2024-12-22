export class Steganography {
  static async hideMessage(image: File, message: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;

          // Convert message to binary
          const binary = message.split('').map(char => 
            char.charCodeAt(0).toString(2).padStart(8, '0')
          ).join('');

          // Add message length at the beginning
          const lengthBinary = message.length.toString(2).padStart(16, '0');
          const fullBinary = lengthBinary + binary;

          // Hide the binary data in the least significant bits
          for (let i = 0; i < fullBinary.length; i++) {
            const bit = parseInt(fullBinary[i]);
            pixels[i * 4] = (pixels[i * 4] & 254) | bit;
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }

  static async extractMessage(image: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;

          // Extract length (first 16 bits)
          let lengthBinary = '';
          for (let i = 0; i < 16; i++) {
            lengthBinary += pixels[i * 4] & 1;
          }
          const messageLength = parseInt(lengthBinary, 2);

          // Extract message
          let binary = '';
          for (let i = 16; i < 16 + messageLength * 8; i++) {
            binary += pixels[i * 4] & 1;
          }

          // Convert binary to text
          const message = binary.match(/.{8}/g)?.map(byte => 
            String.fromCharCode(parseInt(byte, 2))
          ).join('');

          resolve(message || '');
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  }
}