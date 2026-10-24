/**
 * rorraxy Ecosystem - Master Upload Core
 * File Location: upload.js
 */

async function optimizeAndCompressFile(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(file);

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          const isWebPSupported = (() => {
            try {
              return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
            } catch (e) {
              return false;
            }
          })();

          const targetMimeType = isWebPSupported ? 'image/webp' : 'image/jpeg';
          const fileExtension = isWebPSupported ? '.webp' : '.jpg';

          canvas.toBlob((blob) => {
            if (!blob) return resolve(file);

            const baseName = file.name ? file.name.replace(/\.[^/.]+$/, "") : `file_${Date.now()}`;
            const safeBaseName = baseName.replace(/[^a-zA-Z0-9_-]/g, '_');
            const optimizedFileName = safeBaseName + fileExtension;

            const optimizedFile = new File([blob], optimizedFileName, {
              type: targetMimeType,
              lastModified: Date.now()
            });

            resolve(optimizedFile);
          }, targetMimeType, quality);

        } catch (err) {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

async function handleModuleUpload(moduleType, formId) {
  const formElement = document.getElementById(formId);
  if (!formElement) return;

  let targetApiEndpoint = '';
  switch (moduleType) {
    case 'retail':
      targetApiEndpoint = '/retail/save-product';
      break;
    case 'wholesale':
      targetApiEndpoint = '/wholesale/save-order';
      break;
    case 'academy':
      targetApiEndpoint = '/academy/upload-course';
      break;
    case 'business':
      targetApiEndpoint = '/business/submit-lead';
      break;
    default:
      targetApiEndpoint = '/retail/save-product';
  }

  try {
    const rawFormData = new FormData(formElement);
    const processedFormData = new FormData();

    for (let [key, value] of rawFormData.entries()) {
      if (value instanceof File && value.name) {
        if (value.type.startsWith('image/')) {
          const compressedFile = await optimizeAndCompressFile(value);
          processedFormData.append(key, compressedFile);
        } else {
          processedFormData.append(key, value);
        }
      } else {
        processedFormData.append(key, value);
      }
    }

    const response = await fetch(targetApiEndpoint, {
      method: 'POST',
      body: processedFormData
    });

    const result = await response.json();
    return result;

  } catch (err) {
    return { success: false, error: err.message };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const retailForm = document.getElementById('retailUploadForm');
  if (retailForm) {
    retailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleModuleUpload('retail', 'retailUploadForm');
    });
  }

  const wholesaleForm = document.getElementById('wholesaleUploadForm');
  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleModuleUpload('wholesale', 'wholesaleUploadForm');
    });
  }

  const academyForm = document.getElementById('academyUploadForm');
  if (academyForm) {
    academyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleModuleUpload('academy', 'academyUploadForm');
    });
  }

  const businessForm = document.getElementById('businessUploadForm');
  if (businessForm) {
    businessForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleModuleUpload('business', 'businessUploadForm');
    });
  }
});

if (typeof window !== 'undefined') {
  window.optimizeAndCompressFile = optimizeAndCompressFile;
  window.handleModuleUpload = handleModuleUpload;
}
