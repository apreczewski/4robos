const readline = require('readline-sync')
const robots = {
  text: require('./robots/text.js')
}

async function start() {
  const content = {
    maximumSentences: 7
  }
  content.searchTerm = aksAndReturnSearchTerm()
  content.prefix = aksAndReturnPrefix()

  await robots.text(content)

  function aksAndReturnSearchTerm() {
    return readline.question('Type a wikipedia search term: ')
  }

  function aksAndReturnPrefix(){
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
  console.log(JSON.stringify(content, null, 4))
}



start();