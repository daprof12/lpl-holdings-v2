/**
 * Copy to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Try modern Clipboard API first
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback to older method if Clipboard API is blocked
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      return successful;
    } catch (fallbackErr) {
      console.error('Failed to copy:', fallbackErr);
      return false;
    }
  }
};