let baiduAK = 'YTnOIv9nLAOEwr4p1DzVxyR0BbnlM3Ul'

const isPro = import.meta.env.PROD

if (!isPro) {
  // ak for test（测试时多次刷新会报ak错误，如下ak测试备用）
  baiduAK = 'ZAmXygr53gWQvqvGDMDmzP5fffv0Pg3Q'
}

export { baiduAK }
