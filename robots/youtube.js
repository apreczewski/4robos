const state = require('./state.js')
const oauth = require('./oauth-google')


async function robot() {
  const content = state.load()
  await oauth('search', ['https://www.googleapis.com/auth/customsearch/v1?'])
  // await uploadVideo()
  // await uploadThumbnail()

}

module.exports = robot


// Boa tarde, pelo que notei tem algo que mudou na parte de autenticação, não tenho certeza, mas acho que o custom search está exigindo oauth como autenticação. Acabei pulando algumas etapas e fiz a parte de oauth2 do youtube (https://www.youtube.com/watch?v=qYXBWBZTAbc&list=PLMdYygf53DP4YTVeu0JxVnWq01uXrLwHi&index=13), para saber como me autenticar, testei os robots custom search e o do youtube, e bingo! funcionou. A dica é criar a oauth separado, assim é possível utilizar no robots custom search e youtube (passando o scope quando necessário :D)... feito! abraço meus queridos!!!