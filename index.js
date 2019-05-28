const readline = require('readline-sync')

function start() {
  const content = {}
  content.searchTerm = aksAndReturnSearchTerm()
  content.prefix = aksAndReturnPrefix()

  function aksAndReturnSearchTerm() {
    return readline.question('Type a wikipedia search term: ')
  }

  function aksAndReturnPrefix(){
    const prefixes = ['Who is', 'What is', 'The history of']
    const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
    const selectedPrefixText = prefixes[selectedPrefixIndex]

    return selectedPrefixText
  }
  console.log(content)
}


start();