const instagramLogin = require('react-native-instagram-login')
const instagram = require('credentials/instagram')
const state = require('./state.js')

async function robot() {
  const content = state.load()
  await fecthUserInstagram()
  state.save(content)

  async function fecthUserInstagram(){
    instagramLogin
  }

  async function fetchGoogleAndReturnImagesLinks(query) {
    const response = await customSearch.cse.list({
      auth: googleSearchCredentials.apiKey,
      cx: googleSearchCredentials.searchEngineId,
      q: query,

      num: 2
    })
    const imagesUrl = response.data.items.map((item) => {
      return item.link
    })
    return imagesUrl
  }




}

module.exports = robot



