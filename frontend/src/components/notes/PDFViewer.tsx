import React from 'react'

export default function PDFViewer({url}: {url: string}) {
  return (
    <embed src={url} width="100%" height="600px" type="application/pdf" />
  )
}
