# Slack Serverless APIs

This repo is used to:

- Handling events from the Events API using AWS Lambda
- Handling interactive actions from the Interactivity API using AWS Lambda

## Setup

Create `secrets.json` to add environment variables:

```json
{
  "VERIFICATION_TOKEN": "...",
  "...": "..."
}
```

Install packages:

```bash
npm install
```

Deploy to AWS Lambda

```bash
sls deploy
```

Copy generated API gateway URLs to URLs in Slack *Event Subscriptions* and *Interactivity & Shortcuts*.
