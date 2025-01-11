const getStack = (): string[] | undefined => {
  const error = new Error();
  return error.stack?.split("\n");
};

export const getFileName = (): string | null => {
  const stack = getStack();
  if (!stack) return null;

  console.log("fileStack: " + stack.join("\n"));

  const fileNameLine = stack[2];
  const fileName = fileNameLine.match(/\/([^\/]+\.js)/);
  return fileName ? fileName[1] : null;
};

export const getFunctionName = (): string | null => {
  const stack = getStack();
  if (!stack) return null;

  console.log("functionStack: " + stack.join("\n"));

  const firstLine = stack[2];
  const functionNameMatch = firstLine.match(/^(\w+)/);

  return functionNameMatch ? functionNameMatch[1] : null;
};

export const logStackWithLineNumber = (): void => {
  const error = new Error();
  const stack = error.stack?.split("\n");

  if (stack) {
    // Stack trace'i konsola yazdır
    console.log("Stack Trace:\n" + stack.join("\n"));

    // Hatayı doğru satırda almak için stack'in 2. satırına bakıyoruz
    // 0: Error
    // 1: logStackWithLineNumber çağrısı
    // 2: Fonksiyon çağrısı ve hatanın oluştuğu satır
    const stackLine = stack[1]; // Bu, hatanın meydana geldiği yer olmalı

    const match = stackLine.match(/:(\d+):\d+/); // Satır numarasını almak için

    if (match) {
      const lineNumber = parseInt(match[1], 10); // Satır numarasını integer olarak alıyoruz
      console.log(`Hata ${lineNumber}. satırda meydana geldi.`);
    } else {
      console.log("Satır numarası alınamadı.");
    }
  }
};

interface errorResponse {
    message: string | null,
    type: string,
    fileName: string,
    functionName: string,
    lineNumber: number
}

const getErrorDetails = (): errorResponse => {
    const error = new Error();
    console.log(error.stack);
    const stack = error.stack?.split("\n");
  
    if (!stack) {
      return {
        message: error.message,
        type: error.name,  // Hata türünü alıyoruz
        fileName: '',
        functionName: '',
        lineNumber: -1,  // Eğer satır numarası alınamazsa -1 dönebilir
      };
    }
  
    // Satır numarasını ayıklıyoruz
    const lineNumberMatch = stack[1].match(/:(\d+):\d+/);
    const lineNumber = lineNumberMatch ? parseInt(lineNumberMatch[1], 10) : -1;
  
    // Fonksiyon adını ayıklıyoruz
    const functionNameMatch = stack[1].match(/^(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : '';
  
    // Dosya adını ayıklıyoruz
    const fileNameMatch = stack[1].match(/\/([^\/]+\.js)/);
    const fileName = fileNameMatch ? fileNameMatch[1] : '';
  
    return {
      message: error.message,
      type: error.name,  // Hata türü
      fileName,
      functionName,
      lineNumber,
    };
  };
  