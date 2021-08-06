const userGuide = function (guider) {
  const leftImg = require('@/assets/hand-o-left.png')
  const rightImg = require('@/assets/hand-o-right.png')
  const topImg = require('@/assets/hand-o-top.png')
  const bottomImg = require('@/assets/hand-o-bottom.png')
  const bodyStyleOverflow = document.getElementsByTagName('body')[0].style.overflow
  const guiderObject = {}
  if (guider.deleteAll) {
    deleteAll()
  }
  if (guider instanceof Array) {
    // 多个引导
    guider.forEach((item, index) => {
      if (index < guider.length - 1) {
        item.hasNext = true
        item.index = index
      }
      guiderObject[index] = item
    })
    handleldElement(guiderObject[0])
  } else {
    // 单个引导
    handleldElement(guider)
  }
  function handleldElement (params) {
    const element = document.querySelector(params.element)
    // 是否已经跳过
    const hasskiped = localStorage.getItem('#user-guide-skiped')
    if (!element || !!hasskiped) return
    const style = element.getAttribute('style')
    element.setAttribute('style', `${style}display: inherit!important;`)
    // element.setAttribute('style', `${style}display: inherit!important;z-index:9999999!important;positon:relative;`)
    const rect = element.getBoundingClientRect()
    const bodyWidth = document.body.offsetWidth
    const bodyHeight = document.body.offsetHeight
    const hasSkip = !localStorage.getItem(params.element)
    hasSkip && handleGuide({
      contextHeight: params.contextHeight,
      style,
      hasNext: params.hasNext,
      element: params.element,
      index: params.index,
      top: rect.top,
      bottom: bodyHeight - rect.bottom,
      left: rect.left,
      right: bodyWidth - element.offsetWidth - rect.left,
      width: element.offsetWidth,
      height: element.offsetHeight,
      contentWidth: params.contentWidth || 600,
      type: params.position,
      content: params.content
    })
  }
  function handleGuide (params) {
    deleteAll()
    renderOverLay()
    renderHelpLayer(params)
    renderRerLayer(params)
  }
  function deleteAll () {
    document.getElementsByTagName('body')[0].style.overflow = bodyStyleOverflow
    const overlayArr = document.querySelectorAll('.guide-over-lay, .guide-help-layer, .guide-rer-layer')
    overlayArr.forEach(item => {
      document.body.removeChild(item)
    })
  }
  // 记录是否已被查看
  function setLocalItem (name, val) {
    localStorage.setItem(name, val)
  }
  function renderOverLay () {
    const overLay = document.createElement('div')
    overLay.setAttribute('class', 'guide-over-lay')
    overLay.setAttribute('style', 'top:0;inset: 0px;position: fixed;cursor: pointer;box-sizing: content-box;z-index: 999999;opacity: 0;')
    document.body.appendChild(overLay)
  }
  function renderHelpLayer (params) {
    const overLay = document.createElement('div')
    overLay.setAttribute('class', 'guide-help-layer')
    let style = `box-shadow: rgb(255 255 255 / 100%) 0px 0px 1px 2px, rgb(33 33 33 / 50%) 0px 0px 0px 5000px; opacity: 1;box-sizing: content-box; position: absolute; z-index: 9999998; border-radius: 4px;`
    if (params.type === 'left') {
      style += `left: ${params.left}px;top: ${params.top}px;width: ${params.width}px; height: ${params.height}px`
    }
    if (params.type === 'right') {
      style += `left: auto;right: ${params.right}px;top: ${params.top}px;width: ${params.width}px; height: ${params.height}px`
    }
    if (params.type === 'top') {
      style += `left: ${params.left}px;right: auto;top: ${params.top}px;width: ${params.width}px; height: ${params.height}px`
    }
    if (params.type === 'bottom') {
      style += `left: ${params.left}px;right: auto;bottom: auto;top: ${params.top}px;width: ${params.width}px; height: ${params.height}px`
    }
    overLay.setAttribute('style', style)
    document.body.appendChild(overLay)
  }
  function renderRerLayer (params) {
    let imgUrl = bottomImg
    let contentLeft = params.left
    if (params.type === 'left') {
      imgUrl = leftImg
      contentLeft += params.width
    }
    let contentRight = params.right
    if (params.type === 'right') {
      imgUrl = rightImg
      contentRight += params.width + 5
      contentLeft = 'auto'
    }
    let contentTop = params.top
    if (params.type === 'top') {
      contentRight = 'auto'
      imgUrl = topImg
      contentTop += params.height
    }
    const contentBottom = 'auto'
    // 内容区域高度
    if (params.type === 'bottom') {
      imgUrl = bottomImg
      contentTop -= params.height + params.contextHeight
    }
    const contentHeight = params.height
    const overLay = document.createElement('div')
    overLay.setAttribute('class', 'guide-rer-layer')
    let style = 'width: 0px; height: 0px;box-sizing: content-box; position: absolute; visibility: visible; z-index: 100000000; background-color: transparent;'
    style += `left: ${contentLeft}px;right: ${contentRight}px;top: ${contentTop}px;bottom: ${contentBottom}px;width: ${params.contentWidth}px; height: ${contentHeight}px`
    overLay.setAttribute('style', style)
    // 新手引导下一步
    let nextButton = null
    if (params.hasNext) {
      nextButton = document.createElement('button')
      nextButton.innerText = '下一步'
      nextButton.setAttribute('style', 'margin: 0 12px 0 0;border: 1px solid #1890ff; background: #1890ff; color: #fff; font-size: 16px; padding: 5px 10px;cursor: pointer; border-radius: 3px;')
      nextButton.onmousedown = () => {
        setLocalItem(params.element, true)
        document.querySelector(params.element).setAttribute('style', params.style)
        guiderObject[params.index + 1] && handleldElement(guiderObject[params.index + 1])
      }
    }
    // 跳过新手引导
    const skipButton = document.createElement('button')
    skipButton.innerText = '跳过新手引导'
    skipButton.setAttribute('style', 'cursor: pointer;font-size: 16px; padding: 5px 10px; background: #fff; color: #666; border: 1px solid #ddd;')
    skipButton.onmousedown = () => {
      setLocalItem('#user-guide-skiped', true)
      document.querySelector(params.element).setAttribute('style', params.style)
      deleteAll()
    }
    // 我知道了
    const iKnowButton = document.createElement('button')
    iKnowButton.innerText = '我知道了'
    iKnowButton.setAttribute('style', 'cursor: pointer;margin: 0 12px 0 0;font-size: 16px; padding: 5px 10px; border: 1px solid #1890ff; background: #1890ff; color: #fff;')
    iKnowButton.onmousedown = () => {
      setLocalItem(params.element, true)
      document.querySelector(params.element).setAttribute('style', params.style)
      deleteAll()
    }
    // 遮罩层
    const overLayCts = document.createElement('div')
    const overLayCtsLeft = document.createElement('div')
    let overLayCtsLeftStyle = 'width:30px;height:40px;overflow:hidden;'
    if (['left', 'right'].includes(params.type)) {
      overLayCtsLeftStyle = `float:${params.type};`
    }
    overLayCtsLeft.setAttribute('style', overLayCtsLeftStyle)
    let overLayCtsLeftImgStyle = 'color: #fff;'
    let contextHeightStyle = ''
    if (params.type === 'bottom') {
      contextHeightStyle = `height: ${params.contextHeight}px;`
      overLayCtsLeftImgStyle += ''
    } else {
      overLayCtsLeftImgStyle += 'margin-top: 10px;'
    }
    overLayCtsLeft.innerHTML = `<img src=${imgUrl} style="${overLayCtsLeftImgStyle}" />`
    const overLayCtsRight = document.createElement('div')
    let overLayCtsRightStyle = ''
    if (['left', 'right'].includes(params.type)) {
      overLayCtsRightStyle = `margin-${params.type}:30px;`
    }
    overLayCtsRight.setAttribute('style', overLayCtsRightStyle)
    const overLayCtsRightContent = document.createElement('div')
    overLayCtsRightContent.setAttribute('style', `background: #fff;${contextHeightStyle} padding: 15px; border-radius: 5px;font-size: 24px;`)
    overLayCtsRightContent.innerHTML = `<div style="padding: 0 0 15px;">${params.content}</div>`
    nextButton && overLayCtsRightContent.appendChild(nextButton)
    if (!params.hasNext) {
      overLayCtsRightContent.appendChild(iKnowButton)
    }
    overLayCtsRightContent.appendChild(skipButton)
    overLayCtsRight.appendChild(overLayCtsRightContent)
    if (params.type === 'bottom') {
      overLayCts.appendChild(overLayCtsRight)
      overLayCts.appendChild(overLayCtsLeft)
    } else {
      overLayCts.appendChild(overLayCtsLeft)
      overLayCts.appendChild(overLayCtsRight)
    }
    overLay.appendChild(overLayCts)
    document.body.appendChild(overLay)
    setTimeout(() => {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    }, 0)
  }
}
export default userGuide
