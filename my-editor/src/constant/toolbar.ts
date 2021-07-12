import uploadImg from '../img/upload-img.jpeg'

export const toolSchema: {
  [k in string]: {
    icon: any
    onClick: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      activeElement: HTMLElement,
      afterClick?: () => void
    ) => void
  }
} = {
  img: {
    icon: uploadImg,
    onClick: (e, activeElement) => {
      if (activeElement) {
        const img = document.createElement('img')
        img.src = uploadImg
        img.className = 'toolBarIcon'
        activeElement.appendChild(img)
      }
    },
  },
}
