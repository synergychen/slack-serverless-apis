// Verify Url - https://api.slack.com/events/url_verification
function verify(data, callback) {
  console.log(`token: ${data.token}`)
  if (data.token === process.env.VERIFICATION_TOKEN)
    callback(null, data.challenge)
  else callback('verification failed')
}

// Post message to Slack - https://api.slack.com/methods/chat.postMessage
function eventHandler(event, callback) {
  // test the message for a match and not a bot
  if (!event.bot_id && /(aws|lambda)/gi.test(event.text)) {
    const text = `<@${event.user}> isn't AWS Lambda awesome?`
    postToSlack(text)
  }

  callback(null)
}

function postToSlack(message) {
  const postData = {
    text: message
  }
  console.log(postData)
}

module.exports.slackEvents = async (event, context, callback) => {
  try {
    const data = JSON.parse(event.body)
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
