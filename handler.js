const axios = require('axios')

function verify(data, callback) {
  if (data.token === process.env.VERIFICATION_TOKEN) {
    callback(null, data.challenge)
  } else {
    callback('verification failed')
  }
}

function eventHandler(event, callback) {
  const containsKeyword = /(aws|lambda)/gi.test(event.text)
  if (!event.bot_id && containsKeyword) {
    const text = `<@${event.user}> isn't AWS Lambda awesome?`
    postToSlack(text)
  }

  callback(null)
}

function postToSlack(message) {
  const postData = {
    text: message
  }
  axios.post(process.env.SLACK_API_URL, postData)
}

module.exports.handleFarmingResultsEvents = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
    console.log('New event: ', data)
    switch (data.type) {
      case 'url_verification':
        verify(data, callback)
        break
      case 'event_callback':
        eventHandler(data.event, callback)
        break
      default:
        callback(null)
    }
  } catch (e) {
    console.log(e)
  }
}
