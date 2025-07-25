// Temporary capture storage manager using IndexedDB
class CaptureManager {
  constructor() {
    this.dbName = 'ScreenshotCaptures';
    this.dbVersion = 1;
    this.storeName = 'captures';
    this.db = null;
    this.init();
  }

  async init() {
    try {
      this.db = await this.openDB();
      this.startCleanupTimer();
    } catch (error) {
      console.warn('Failed to initialize capture storage, using memory fallback:', error);
      this.memoryStorage = new Map();
    }
  }

  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async storeCapture(dataUrl, metadata) {
    const capture = {
      id: this.generateId(),
      dataUrl,
      metadata,
      timestamp: Date.now()
    };

    if (this.db) {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        await this.promisifyRequest(store.add(capture));
        return capture.id;
      } catch (error) {
        console.warn('Failed to store in IndexedDB, using memory:', error);
      }
    }

    // Fallback to memory storage
    if (this.memoryStorage) {
      this.memoryStorage.set(capture.id, capture);
      return capture.id;
    }

    throw new Error('No storage available');
  }

  async getCapture(id) {
    if (this.db) {
      try {
        const transaction = this.db.transaction([this.storeName], 'readonly');
        const store = transaction.objectStore(this.storeName);
        return await this.promisifyRequest(store.get(id));
      } catch (error) {
        console.warn('Failed to retrieve from IndexedDB:', error);
      }
    }

    if (this.memoryStorage) {
      return this.memoryStorage.get(id);
    }

    return null;
  }

  async deleteCapture(id) {
    if (this.db) {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        await this.promisifyRequest(store.delete(id));
      } catch (error) {
        console.warn('Failed to delete from IndexedDB:', error);
      }
    }

    if (this.memoryStorage) {
      this.memoryStorage.delete(id);
    }
  }

  async cleanupOldCaptures() {
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago

    if (this.db) {
      try {
        const transaction = this.db.transaction([this.storeName], 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const index = store.index('timestamp');
        const range = IDBKeyRange.upperBound(cutoffTime);
        
        const request = index.openCursor(range);
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            cursor.delete();
            cursor.continue();
          }
        };
      } catch (error) {
        console.warn('Failed to cleanup IndexedDB:', error);
      }
    }

    if (this.memoryStorage) {
      for (const [id, capture] of this.memoryStorage.entries()) {
        if (capture.timestamp < cutoffTime) {
          this.memoryStorage.delete(id);
        }
      }
    }
  }

  startCleanupTimer() {
    // Run cleanup every hour
    setInterval(() => this.cleanupOldCaptures(), 60 * 60 * 1000);
  }

  generateId() {
    return `capture_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  promisifyRequest(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Singleton instance
export const captureManager = new CaptureManager();

export const downloadFromStorage = async (id, filename) => {
  try {
    const capture = await captureManager.getCapture(id);
    if (!capture) {
      throw new Error('Capture not found');
    }

    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = capture.dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the stored capture after download
    await captureManager.deleteCapture(id);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};