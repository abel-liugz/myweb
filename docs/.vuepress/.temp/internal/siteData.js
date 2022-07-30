export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"Abel's Web\",\"description\":\"My tech blog\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/images/JAVA.png\"}],[\"link\",{\"rel\":\"stylesheet\",\"href\":\"/css/style.css\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
