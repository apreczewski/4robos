const readline = require('readline-sync')
const state = require('./state.js')

function robot() {
  const content = {
    maximumSentences: 7
  }
  content.searchTerm = aksAndReturnSearchTerm()
  content.prefix = aksAndReturnPrefix()
  state.save(content)

  function aksAndReturnSearchTerm() {
    return readline.question('Type a wikipedia search term: ')
  }

  function aksAndReturnPrefix(){
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
}
module.exports = robot