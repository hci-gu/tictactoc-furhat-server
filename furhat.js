let furhat = new Furhat()

furhat.init('localhost', '80', 'api', (status, hat) => {
    if (status === 'open') {
        hat.say('I am connected!')
    }
})