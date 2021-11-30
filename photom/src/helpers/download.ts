const createAnchorAndClick = (url: string, fileName: string) => {
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', fileName)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  const event = document.createEvent('MouseEvents')
  event.initEvent('click', true, true)
  link.dispatchEvent(event)
}

/**
 * Show the "Save as" dialog to download a blob
 * @param blob Blob that will be downloaded
 * @param fileName Default filename for the content that will be downloaded
 */
const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(new Blob([blob]))
  createAnchorAndClick(url, fileName)
}

/**
 * Show the "Save as" dialog to download the content of a URL
 * @param url URL that will be fetched
 * @param fileName Default filename for the content that will be downloaded
 */
const downloadUrl = async (url: string, fileName: string) => {
  const response = await fetch(url, { method: 'GET' })
  const blob = await response.blob()
  downloadBlob(blob, fileName)
}

export { downloadBlob,  downloadUrl }
