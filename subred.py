import praw

# Replace with your Reddit app credentials
client_id = "hi04eOy9-5rUGwoBWZIGAQ"
client_secret = "sOatm7WC3GqEf32x7zt_F3beor669g"
user_agent = "ChangeMeClient/0.1 by YourUsername"

# Create a Reddit instance
reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret,
                     user_agent=user_agent)

# Specify the subreddit and submission ID
subreddit_name = "AskReddit"
submission_id = "1b9o6zf"  # You can find this in the URL of the Reddit post

# Get the submission object
submission = reddit.submission(id=submission_id)

# Replace 'more' comments (load all comments)
submission.comments.replace_more(limit=None)

# Iterate through all comments (top-level and replies)
for comment in submission.comments.list():
    print(comment.body)  # Print the comment text
    # You can also access other attributes like author, score, etc.

