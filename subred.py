import praw

# Replace with your Reddit app credentials
client_id = "YOUR_CLIENT_ID"
client_secret = "YOUR_CLIENT_SECRET"

# Specify the AskReddit post URL
url = "https://www.reddit.com/r/AskReddit/comments/xxxxxx/"  # Replace with the actual URL

reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret,
                     user_agent="Your Script Name")

submission = reddit.submission(url=url)

# Replace 'more' comments (load all comments)
submission.comments.replace_more(limit=None)

# Iterate through all comments (top-level and replies)
for comment in submission.comments.list():
  print(comment.body)  # Print the comment text
  # You can also access other attributes like author, score, etc.
