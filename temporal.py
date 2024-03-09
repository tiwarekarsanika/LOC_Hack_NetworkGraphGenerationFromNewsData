import networkx as nx
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import random

# Function to generate dummy datetime strings for a month
def generate_datetime_for_month(year, num_events):
    dates = [f"{year}-{random.randint(1, 7)}-{day:02d} {random.randint(10, 18)}:00" for day in range(1, num_events + 1)]
    return dates

# Generate dummy data for 30 events
events_data = []
for event_num in range(1, 10):
    companies = [f"Company{i}" for i in range(1, random.randint(1, 5))]
    sentiments = ["positive", "negative", "neutral"]
    datetime_values = generate_datetime_for_month(2024, event_num)
    sentiment = random.choice(sentiments)
    group_color = ""
    events_data.append({"event": f"Event{event_num}", "companies": companies, "datetime": random.choice(datetime_values), "sentiment": sentiment, "group_color": group_color})
        

# Print the generated dummy data
# for event_data in events_data:
#     print(event_data)

# Create a directed graph
G = nx.DiGraph()

# Add nodes and edges based on companies affected
for event in events_data:
    G.add_node(event["event"], companies=event["companies"], datetime=event["datetime"], sentiment=event["sentiment"])

# Iterate through the list of companies affected and add edges if two nodes share the same company
for i in range(len(events_data)):
    for j in range(i + 1, len(events_data)):
        common_companies = set(events_data[i]["companies"]).intersection(events_data[j]["companies"])
        if common_companies:
            edge_label = ", ".join(common_companies)
            G.add_edge(events_data[i]["event"], events_data[j]["event"], companies=edge_label)

#semantic similarity
node_colors = {"positive": "yellow", "negative": "red", "neutral": "blue"}
sentiment_colors = [node_colors[event["sentiment"]] for event in events_data]

#temporal proximity
def day_difference(date1, date2):
    date1 = datetime.strptime(date1, "%Y-%m-%d %H:%M")
    date2 = datetime.strptime(date2, "%Y-%m-%d %H:%M")
    return abs(date2.day - date1.day)

# Function to add events to groups based on proximity
def add_new_group(event):
    group = [[], 0, ""]
    for eve in events_data:
        if eve['event'] != event['event']:
            print("inside if statement")
            if (day_difference(event["datetime"], eve["datetime"]) < 7):
                print("difference is", day_difference(event["datetime"], eve["datetime"]))
                new_group_color = f"#{random.randint(0, 0xFFFFFF):06x}"
                print("new group color is", new_group_color)
                event["group_color"] = new_group_color
                eve["group_color"] = new_group_color
                group[0].append(event)
                group[0].append(eve)
                sum = 0
                for e in group[0]:
                    date = datetime.strptime(e['datetime'], "%Y-%m-%d %H:%M")
                    sum = sum + date.day
                avg = int(sum / len(group))
                print("avg is", avg)
                group[1] = avg
                group[2] = new_group_color
    groups.append(group)

groups = []
# Create groups and assign colors
# for event_data in events_data:
for i in range(2):
    print(events_data[i])
    # for group in groups:
    #     if abs(event_data["datetime"].days - group[1]) < 7:
    #         G.nodes[event_data["event"]]["group_color"] = group[2]
    #         group[0].append(event_data)
    # add_new_group(event_data)
    add_new_group(events_data[i])
    print("--------------------------")
    
# for group in groups:
for group in groups:
    titles = []
    for eve in group[0]:
        titles.append(eve['event'])
    print("Group 1 is: ", titles, group[1], group[2])

# Draw the graph
# pos = nx.circular_layout(G)
# labels = {event: event for event in G.nodes}
# edge_labels = {(u, v): G[u][v]["companies"] for u, v in G.edges}

# nx.draw(G, pos, with_labels=True, labels=labels, node_size=700, node_color=sentiment_colors, font_size=8, font_color="black", font_weight="bold", arrowsize=10)
# nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_color='red', font_size=3)

# plt.title("Events Network Graph")
# plt.show()

