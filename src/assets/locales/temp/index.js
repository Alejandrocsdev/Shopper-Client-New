// 內建模組 (Node.js built-in module)
import path from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 原始資料檔案路徑
const rawFilePath = path.join(__dirname, 'raw.json')
// 轉換後的資料檔案路徑
const newFilePath = path.join(__dirname, 'new.json')

async function transformRawToLang() {
  try {
    // 讀取 raw.json
    const data = await fs.readFile(rawFilePath, 'utf8')
    const rawData = JSON.parse(data)
    const transformedData = {}

    // 遍歷陣列並轉換結構
    rawData.forEach((item) => {
      const langCode = item.Name
      // 複製所有欄位
      const translationData = { ...item }

      // 移除 Name 欄位，因為它是語言代碼
      delete translationData.Name

      // 將剩下的欄位動態加入 translation
      transformedData[langCode] = {
        translation: translationData
      }
    })

    // 寫入 new.json 檔案
    await fs.writeFile(newFilePath, JSON.stringify(transformedData, null, 2))
    console.log('new.json has been successfully created!')
  } catch (error) {
    console.error('Error processing files:', error)
  }
}

transformRawToLang()
